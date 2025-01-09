import mongoose from "mongoose";

const logoSchema = new mongoose.Schema({
    logo:{
        type:String,
        required:true
    }
})

const logoModel = mongoose.model('Logo', logoSchema) || mongoose.model('Logo');

export default logoModel;