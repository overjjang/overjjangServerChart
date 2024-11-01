const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();
const serverState = require('../models/chart.model');
const cron = require('node-cron');
const recordServerStatus = require('../recordState');
const DBId = '6724636074524c03dee81ca6';
const serverName = process.env.SERVER_IP;

router.get('/',(req ,res)=>{
    res.send("Hello World");
});
router.get('/work',(req ,res)=>{
    res.render('../views/work');
});
router.post('/updateServerState', (req, res) => {
    recordServerStatus[0]()
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});

router.post('/scheduleCronJob', (req, res) => {
    cron.schedule('*/1 * * * *', () => {
        recordServerStatus[0]();
    });
    res.sendStatus(200);
});

router.post('/createServerState', (req, res) => {
    recordServerStatus[1]()
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});

module.exports = router;