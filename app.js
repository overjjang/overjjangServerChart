const mongoose = require('mongoose');
const express = require('express');
const path = require("path");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const crypto = require('crypto');


const app = express();

require('dotenv').config();

app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString('base64');
    next();
});


app.use(logger('dev'));
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
            (req, res) => `'nonce-${res.locals.nonce}'`
        ],
        scriptSrcAttr: [
            "'none'"
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

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api', require('./router/statusRouter'));
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