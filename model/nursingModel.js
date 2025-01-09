import mongoose from "mongoose";

const nursingCourseSchema = new mongoose.Schema({
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
      qualification: { type: String },
      percentage: { type: String },
      certificates: { type: String },
      workExperience: { type: String },
      ageLimit: { type: String },
      mediumOfInstruction: { type: String },
    },
  ],
  image: {
    type: String, // Assuming image paths or URLs are stored as strings
    required: true,
  },
});

const NursingModel = mongoose.model("NursingCourse", nursingCourseSchema);

export default NursingModel;
