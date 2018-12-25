let { RpcClient } = require('tendermint');
var fetchUrl = require("fetch").fetchUrl;
const transaction = require('../transaction/index');
const vstruct = require('varstruct');
const base32 = require('base32.js');


const Followings = vstruct([
    { name: 'addresses', type: vstruct.VarArray(vstruct.UInt16BE, vstruct.Buffer(35))},
])


//Khi commit cac command khac thay doi file  v1
const commit=(req,res)=>{
    const txBody=req.body.tx;
    console.log(txBody);
    const privateKey=req.body.privateKey;
    var params=txBody.params;


    if(txBody.operation==='update_account' && params.key==='name' ){
        params={
            key:params.key,
            value:Buffer.from(params.value)
        }
    }else{
        if(txBody.operation==='update_account' && params.key === 'followings'){
            const value={
                addresses:[base32.decode(params.addresses)]
            }
            params={
                key:params.key,
                value:Followings.encode(value)
            }
        }
    }
    const tx={
        version:txBody.version,
        sequence:txBody.sequence+1,
        operation:txBody.operation,
        memo:Buffer.alloc(0),
        params:params,
        signature:new Buffer(64)  
    }
    let client = RpcClient('https://gorilla.forest.network:443');
    try{
        transaction.sign(tx,privateKey);
    }catch(error){
        return res.status(400).json({ error:'Địa chỉ không chính xác' });
    }finally{
        const etx=transaction.encode(tx).toString('hex');
        const prefix="0x";
        const data2= prefix.concat(etx);
        client.broadcastTxCommit({ tx: data2  })
        .then((hash)=>{
            if(JSON.stringify(hash.check_tx).length != 2){
                console.log(hash.check_tx);
                return res.status(400).json({error: txBody.operation+ "  "+hash.check_tx.log});
            }else{
                console.log(hash);
                const data={
                    msg:'success'
                }
                res.json(data);
            }})
        .catch((err)=>{
            return res.status(400).json({
                error:'RPC tendermint error'
            })
        });
    }
}
const getDetail=(req,res)=>{
    const publicKey=req.params.publickey;
    const a=[];
    const b=[];
    const c=[];
    const d=[];
    const e=[];
    var followings=[];
    var balance=0;
    var sequence=0;
    var name='';

    var Url="https://zebra.forest.network/tx_search?query=%22account=%27"+publicKey+"%27%22";
        fetchUrl(Url, function(error, meta, body){
        
        var TotalCount=JSON.parse(body.toString()).result.total_count;
        var url="https://zebra.forest.network/tx_search?query=%22account=%27"+ publicKey +"%27%22&per_page=%22"+TotalCount+"%22";
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
            }})
            b.forEach(element => {
                if(element.operation==='update_account' && element.params.key==='name'){
                   name=element.params.value.toString('utf-8');
                }else{
                    if(element.operation==='update_account' && element.params.key==='followings'){
                        c.push( Followings.decode(element.params.value).addresses);
                    }

                }
            })
            if(c.length !== 0){
                c.forEach(element=>{
                    d.push(element)
                })

                d.forEach(element=>{
                    element.forEach(e=>{
                        followings.push(base32.encode(e))
                    })
                })
            }

            const data={
                balance:balance,
                sequence:sequence,
                name:name,
                followings:followings,
                transactions:b
            }
            res.json(data);
        });
    });
}



module.exports={
    commit,
    getDetail
}

