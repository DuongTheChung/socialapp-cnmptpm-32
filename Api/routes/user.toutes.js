const express=require('express');
const userCtrl=require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const router = express.Router()

router.route('/create')
  .post(userCtrl.create)

router.route('/list')
  .post(userCtrl.list)
  
router.route('/:userId')
  .get(userCtrl.getUserById)

router.route('/balance-sequence/:publickey')
  .get(userCtrl.updateBalanceAndSequenceUser)


module.exports= router;