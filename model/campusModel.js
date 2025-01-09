import mongoose from "mongoose";

const facilitiesSchema = new mongoose.Schema({
    facility:{
      type:String,
      required:true
    },
    facilityDescription:{
      type:String,
      required:true
    },
    facilityImage:{
      type:String,
      required:true
    }
})

const campusSchema = new mongoose.Schema({
    title:{
      type:String,
      required:true
    },
    description:{
      type:String,
      required:true
    },
    facilities:[facilitiesSchema]
})

const campusModel = mongoose.model("Campus" , campusSchema) || mongoose.model("Campus")

export default campusModel