const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/',(req ,res)=>{
    res.render('../views/index');
});

router.get('/survey',(req ,res)=>{
    res.redirect('https://forms.gle/AEuL6E6BbXAWZrQT6');
});


module.exports = router