import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    pdf:{
        type:String,
        required:true
    }
})

const applicationModel = mongoose.model('Application' ,applicationSchema) || mongoose.model('Application');

export default applicationModel;