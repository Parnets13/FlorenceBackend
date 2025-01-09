import mongoose from "mongoose";

const valueSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const missionValuesSchema = new mongoose.Schema({
    mission:[{
        type:String,
        required:true
    }],
    values:[valueSchema]
})

const missionValuesModel = mongoose.model('MissionValues' , missionValuesSchema) || mongoose.model('MissionValues');

export default missionValuesModel