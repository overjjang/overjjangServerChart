const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/sign-up',(req ,res)=>{
    res.render('../views/user/sign-up');
});
router.get ('/sign-in',(req ,res)=>{
    res.render('../views/user/sign-in');
});
module.exports = router