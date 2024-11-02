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
router.get('/chart',(req ,res)=>{
    res.render('../views/chart');
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
    cron.schedule(`*/${req.body.repeatTime} * * * *`, () => {
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
router.get('/getChartData', async (req, res) => {
    try {
        const data = await serverState.findOne({ date: new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString().split('T')[0] }); // Ensure this returns an array
        console.log(data.history);
        res.json(data.history); // Ensure this returns an array
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;