const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/',(req ,res)=>{
    res.render('../views/index');
});

router.get("/server-Info",(req,res)=>{
    res.render('../views/hostState');
});

module.exports = router