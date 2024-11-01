const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();
const serverState = require('../models/chart.model');
const cron = require('node-cron');
const recordServerStatus = require('../recordState');
const serverName = process.env.SERVER_IP;

router.get('/',(req ,res)=>{
    res.send("Hello World");
});
router.get('/work',(req ,res)=>{
    res.render('../views/work');
});
router.post('/updateServerState', (req, res) => {
    recordServerStatus[1]()
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});

router.post('/createRecord', (req, res) => {
    recordServerStatus[2]()
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});

router.post('/saveRecord', (req, res) => {
    recordServerStatus[0]()
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});
router.post('/scheduleCronJob', (req, res) => {
    cron.schedule('*/10 * * * *', () => {
        recordServerStatus[1]();
    });
    cron.schedule('0 0 * * *', () => {
        recordServerStatus[2]();
    });
    res.sendStatus(200);
});
router.post('/stopScheduledCronJob', (req, res) => {
    cron.cancelAll();
    res.sendStatus(200);
});


module.exports = router;