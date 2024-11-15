var express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const bodyParser = require('body-parser');
const cron = require('node-cron');

var router = express.Router();

const serverState = require('../models/chart.model');
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


router.post('/scheduleCronJob', async (req, res) => {
    const time = req.body.repeatTime;
    cron.schedule(`*/${time} * * * *`, () => {
        recordServerStatus[1]();
    });
    cron.schedule('0 0 * * *', () => {
        recordServerStatus[2]();
    });
    res.sendStatus(200);
    console.log(`Cron job scheduled to run every ${time} minutes`);
});


router.post('/stopScheduledCronJob', (req, res) => {
    cron.cancelAll();
    res.sendStatus(200);
});


router.post('/addServer', async (req, res) => {
    const serverName = req.body.serverName;
    const serverNames = await JSON.parse(fs.readFileSync('./servers.json', 'utf-8'));
    if (!serverNames.includes(serverName)) {
        serverNames.push(serverName);
        fs.writeFileSync('./servers.json', JSON.stringify(serverNames));
        res.sendStatus(200);
    } else {
        res.status(400).send('Server already exists');
    }
});


router.get('/getServers', async (req, res) => {
    try {
        const date = req.query.date || new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }).split(' ')[0];
        // const serverNames = await JSON.parse(fs.readFileSync('./servers.json', 'utf-8'));
        const serverNames = await serverState.find({ date: date }).distinct('serverName');
        res.json(serverNames);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.get('/getChartData', async (req, res) => {
    try {
        const date = req.query.date; // Read date from query parameters
        const serverName = req.query.serverName; // Read serverName from query parameters
        if (!date || !serverName) {
            return res.status(400).send('Date and Name parameter is required');
        }
        const data = await serverState.findOne({ date: date,serverName : serverName }); // Ensure this returns an array
        console.log(data.history);
        res.json(data.history); // Ensure this returns an array
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;