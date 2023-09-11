const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    eventName : {
        type : String,
        required : true
    },
    eventVenue : {
        type : String,
        required : true,
    },
    // eventDate :{
    //     type : Date,
    //     required : true,
    // },
    eventTime : {
        type : Date,
        required : true,
    },
    eventDescription : {
        type: String,
        required : true
    },
    timeStamp:{
        type:Date,
        default:Date.now().toString()
    },
}) 

const Model = new mongoose.model("Event",EventSchema);
module.exports = Model;