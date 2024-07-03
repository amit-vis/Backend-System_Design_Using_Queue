// Schema for request
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    requestData:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['queued', 'processing','completed','failed'],
        default: 'queued'
    }
},{
    timestamps: true
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;