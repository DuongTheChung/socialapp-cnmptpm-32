const User = require('../models/user.model');
const _ = require('lodash');
const errorHandler = require('../helpers/dbErrorHandler');
const formidable = require('formidable');
const fs = require('fs');
const transaction = require('../transaction/index');
const samKey = require('../transaction/same-key');
let { RpcClient } = require('tendermint');


Object.prototype.isEmpty = function() {
  for(var key in this) {
      if(this.hasOwnProperty(key))
          return false;
  }
  return true;
}

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
                if(!hash.check_tx.isEmpty()){
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
module.exports = { 
    create,
}