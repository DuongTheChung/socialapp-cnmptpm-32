const express=require('express');
const tranCtrl=require('../controllers/transaction.controller');
const router = express.Router()

router.route('/commit')
    .post(tranCtrl.commit)
router.route('/balance-sequence/:publickey')
    .get(tranCtrl.getBalanceAndSequence)

module.exports=router;
