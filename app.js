const mongoose = require('mongoose');
const express = require('express');
const path = require("path");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');


const app = express();

require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
            "'self'",
            "'sha256-+Lwo+D/2ltHRTtrwQ/InH0byJrAtqO7I0BYlu7tIURo='",
            "*"
        ],
        imgSrc: ["*", "data:"],
        frameSrc: ["*"],
        connectSrc: ["'self'"]
    }
}));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/', require('./router/index'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public'), {
    maxAge: '1d' // 캐시 만료 시간을 1일로 설정
}));

//mongoose
const db = require("./models");
db.mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("데이터베이스 연결 수립 성공!");
    })
    .catch(err => {
        console.log("데이터베이스 연결 수립 실패!", err);
        process.exit();
    });


module.exports = app;