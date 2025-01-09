import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    }
})

const galleryModel = mongoose.model('Gallery' ,gallerySchema) || mongoose.model('Gallery');

export default galleryModel