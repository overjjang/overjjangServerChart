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
            "'sha256-wCNJK3b2xzSDyr86kCPACP4dSWrmAd1YewdFw/8iHT0='",
            "'sha256-QVuk0/+drQHQzqt1qAP0XzLjXhz01BGA4BNW1qRsct0='",
            "https://cdn.jsdelivr.net",
            "https://static.cloudflareinsights.com"
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