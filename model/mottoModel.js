import mongoose from "mongoose";

const mottoSchema = new mongoose.Schema({
    mission:[{
        type:String,
        required:true
    }],
    vision:[{
        type:String,
        required:true
    }]
})

const mottoModel = mongoose.model('Motto' , mottoSchema) || mongoose.model('Motto')

export default mottoModel