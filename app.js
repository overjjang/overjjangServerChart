const mongoose = require('mongoose');
const express = require('express');
const path = require("path");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const app = express();

require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', require('./router/serverState'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet.contentSecurityPolicy({
    directives: {
        scriptSrc: [
            "'self'",
            "https://code.jquery.com/",
            "https://cdn.jsdelivr.net",
            "https://cdnjs.cloudflare.com",
        ],
        imgSrc: [
            "'self'",
            "https://github.com",
            "https://avatars.githubusercontent.com",
            "http://www.w3.org/2000/svg",
            "data:"
        ],
        upgradeInsecureRequests: null // Disable HTTP to HTTPS redirection
    }
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