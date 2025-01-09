import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    tag:[{
        type:String,
        required:true
    }],
    date:{
        type:Date,
        required:true
    }
})

const eventModel = mongoose.model('Event' , eventSchema) || mongoose.model('EventSchema')

export default eventModel;