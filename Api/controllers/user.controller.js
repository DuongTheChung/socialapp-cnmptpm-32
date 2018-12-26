const User = require('../models/user.model');
const _ = require('lodash');
const errorHandler = require('../helpers/dbErrorHandler');


const create=(req, res, next)=>{
  const name=req.body.name;
  const email=req.body.email;
  const password=req.body.password;
  const publicKey=req.body.publicKey;

  const user=new User({
    name:name,
    email:email,
    password:password,
    publicKey:publicKey
  });

    User.findOne({ email: email },(err,result)=>{
      if(result){
        return res.status(400).json({
          error: 'Email already exists'
        })
      }else{
        user.save((err, result) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler.getErrorMessage(err)
            })
          }else{
            return  res.status(200).json({
              data: result
            })
        }});
      }
    });
}
const list =(req,res)=>{
  const userId=req.body._id;
  const publicKeys=req.body.publicKeys;
  User.find({ _id: { $nin : userId } ,publicKey:{ $nin: publicKeys} },(err, users)=>{
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

module.exports = { 
    create,
    list,
    getUserById

}