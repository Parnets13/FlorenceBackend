import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
    address:{
        type:String,
        required:true
    },
    tel:{
        type:Array,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    facebook:{
        type:String,
        required:true
    },
    google:{
        type:String,
        required:true
    },
    instagram:{
        type:String,
        required:true
    },
    twitter:{
        type:String,
        required:true
    }
})

const footerModel = mongoose.model("Footer" , footerSchema) || mongoose.model("Footer") ;

export default footerModel