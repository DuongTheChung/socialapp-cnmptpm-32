var fetchUrl = require("fetch").fetchUrl;
const vstruct = require('varstruct');
const crypto = require('crypto');
const { Keypair } = require('stellar-base');
const v1=require('./v1');
const samKey = require('./same-key');
let { RpcClient } = require('tendermint');



const Transaction = vstruct([
    { name: 'version', type: vstruct.UInt8 },
  ]);
  
  
function encode(tx) {
    switch (tx.version) {
      case 1:
        return v1.encode(tx);
      default:
        throw Error('Unsupport version');
    };
}

function decode(data) {
    var binaryBuffer = new Buffer(data.toString('ascii'), 'base64')
    const versionTx = Transaction.decode(binaryBuffer);
    switch (versionTx.version) {
      case 1:
        return v1.decode(binaryBuffer);
        break;
      default:
        throw Error('Unsupport version');
    }
}

function getUnsignedHash(tx) {
    return crypto
      .createHash('sha256')
      .update(encode({
        ...tx,
        signature: Buffer.alloc(64, 0),
      }))
      .digest();
}
  
  
function sign(tx, secret) {
    const key = Keypair.fromSecret(secret);
    tx.account = key.publicKey();
    tx.signature = key.sign(getUnsignedHash(tx));
}
  

function verify(tx) {
    const key = Keypair.fromPublicKey(tx.account);
    return key.verify(getUnsignedHash(tx), tx.signature);
}

const create_account=(tx)=>{
    const atx=tx;
    let client = RpcClient('https://gorilla.forest.network:443');
    sign(atx,samKey.secretKey);
    const etx=encode(atx).toString('hex');
    const prefix="0x";
    const data2= prefix.concat(etx);
    client.broadcastTxCommit({ tx: data2  })
        .then(res=>{
            console.log(res);
            return true;
        })
        .catch(err=>{
            console.log(err);
            return false
        })

}

module.exports= {
    create_account, encode,decode,
    getUnsignedHash,sign,verify
}

  



