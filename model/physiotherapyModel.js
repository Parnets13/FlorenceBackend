import mongoose from "mongoose";

const physiotherapyCourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  eligibility: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  details: [
    {
      certificates: { type: String },
      qualification: { type: String },
      percentage: { type: String },
      mediumOfInstruction: { type: String },
      ageLimit: { type: String }, // Optional for some courses
    },
  ],
  image: {
    type: String, // Store the URL or path of the image
    required: true,
  },
});

const physiotheraphyModel = mongoose.model(
  "PhysiotherapyCourse",
  physiotherapyCourseSchema
);

export default physiotheraphyModel;
