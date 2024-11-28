const app = require('./app');  // app.js에서 express 앱을 가져옴
const mongoose = require('mongoose');
const recordServerStatus = require('./recordState'); // Minecraft 서버 상태 기록 코드
const cron = require('node-cron');
const https = require('http');
const helmet = require("helmet");
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(helmet.contentSecurityPolicy(
    {
        defaultSrc: ["'self'"],
        scriptSrc: ["*"],
        imgSrc: ["*"],
        styleSrc: ["*"],
        frameSrc: ["*"]
    }
))

// 서버 실행
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

// 크론 스케줄러 설정 - 매 시간마다 서버 상태 기록
// cron.schedule('*/1 * * * *', () => {
//     recordServerStatus();
// });
