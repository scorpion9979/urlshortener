const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    original_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;