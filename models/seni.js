// models/Seni.js
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');


const SeniSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => nanoid(10)
    },
    nama: {
        type: String,
        required: true
    },
    daerah: {
        type: String,
        required: true
    },
    deskripsi: {
        type: String,
        required: true
    },
    videoLink: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Seni', SeniSchema);
