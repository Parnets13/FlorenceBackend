import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    }
})

const testimonialModel = mongoose.model('Testimonial' , testimonialSchema) || mongoose.model('Testimonial')

export default testimonialModel