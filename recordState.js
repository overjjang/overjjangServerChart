const serverState = require('./models/chart.model'); // 모델 경로 수정
const dotenv = require('dotenv');
const apiUrl = "https://api.mcsrvstat.us/3/"
const serverIP = process.env.SERVER_IP;
const DBId = '6724636074524c03dee81ca6';

async function createRecord() {
    serverState.create({
        serverIP,
        history: []
    })
    console.log("Record created");
}

async function recordServerStatus() {
    fetch(apiUrl + serverIP)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const date = new Date();
            const isServerOn = data.online;
            const userCount = isServerOn ? data.players.online : 0;
            serverState.findOneAndUpdate(DBId, {
                history: [{
                    date,
                    isServerOn,
                    userCount
                }]
            });
            console.log("Server status recorded:", {date, isServerOn, userCount});
        })
        .catch(error => {
            console.error("Error recording server status:", error);

        });
}

module.exports = [recordServerStatus, createRecord];