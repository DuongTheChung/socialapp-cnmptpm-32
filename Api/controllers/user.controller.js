var fetchUrl = require("fetch").fetchUrl;
const User = require('../models/user.model');
const _ = require('lodash');
const errorHandler = require('../helpers/dbErrorHandler');
const formidable = require('formidable');
const fs = require('fs');
const transaction = require('../transaction/index');
const samKey = require('../transaction/same-key');
let { RpcClient } = require('tendermint');



const create=(req, res, next)=>{
  const user = new User(req.body);
  const tx={
    version:1,
    sequence:21,
    memo:Buffer.alloc(0),
    operation:'create_account',
    params:{
      address:user.publicKey
    }};
    User.findOne({ email: user.email },(err,result)=>{
      if(result){
        return res.status(400).json({
          error: 'Email already exists'
        })
      }else{
          let client = RpcClient('https://gorilla.forest.network:443');
          transaction.sign(tx,samKey.secretKey);
          const etx=transaction.encode(tx).toString('hex');
          const prefix="0x";
          const data2= prefix.concat(etx);
          client.broadcastTxCommit({ tx: data2  })
              .then((hash)=>{
                if(JSON.stringify(hash.check_tx).length==2){
                  console.log(hash.check_tx);
                  return res.status(400).json({ error: hash.check_tx.log })
                }else{
                  console.log(hash);
                  user.save((err, result) => {
                    if (err) {
                      return res.status(400).json({
                        error: errorHandler.getErrorMessage(err)
                      })
                    }else{
                      return  res.status(200).json({
                        data: result
                      })
                    }
                  });
                }})
              .catch((err)=>{
                console.log(err);
                res.status(400).json({
                  error: err
              });
          })
      }
    })
}

const list =(req,res)=>{
  const userId=req.body._id;
  User.find({ _id: { $nin : userId } },(err, users)=>{
    if(err){
      return res.status(400).json({
        error:errorHandler.getErrorMessage(err)
      })
    }
    res.json(users);
  })
}

const getUserById=(req,res,next)=>{
  const id=req.params.userId;
  User.findById({_id:id},(err,user)=>{
    if(err){
      return res.status(400).json({
        error:errorHandler.getErrorMessage(err)
      })
    }
    res.json(user);
  });
}

const updateBalanceAndSequenceUser=(req,res)=>{
  const publicKey=req.params.publickey;
  const a=[];
  const b=[];
  const c=[];
  var balance=0;
  var sequence=0;
  var url="https://komodo.forest.network/tx_search?query=%22account=%27"+publicKey+"%27%22";
  fetchUrl(url, function(error, meta, body){
    if(error){
      res.status(400).json({
        error:'Update balance and sequence error'
      })
    }
    JSON.parse(body.toString()).result.txs.forEach(element => {
      a.push(element.tx);
    });
    a.forEach(element => {
      const dt=transaction.decode(element);
      b.push(dt);
    });
    b.forEach(element => {
      if(element.operation==='payment' && element.params.address===publicKey){
        balance=balance+element.params.amount;
      }else{
        if(element.operation==='payment' && element.params.address!==publicKey){
          balance=balance-element.params.amount;
        }
      }
    })
    b.forEach(element => {
      if(element.account===publicKey){
        if(element.sequence > sequence){
          sequence=element.sequence
        }
      }
    });
    const data={
      balance:balance,
      sequence:sequence
    }
    res.json(data);
  });
}

module.exports = { 
    create,
    list,
    getUserById,
    updateBalanceAndSequenceUser,
}