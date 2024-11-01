const mongoose = require('mongoose');
const stream = require("node:stream");
// const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const serverHistorySchema = new Schema({
    serverName: {
        type: String,
        required: true
    },
    history:[{
        date: {
            type: Date,
            required: true
        },
        isServerOn: {
            type: Boolean,
            required: true
        },
        userCount: {
            type: Number,
            required: true
        }
    }]
});

module.exports = mongoose.model('serverState', serverHistorySchema);