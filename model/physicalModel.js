import mongoose from "mongoose";

const physicalSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  libraryHeading: {
    type: String,
    required: true,
  },
  libraryDescription: {
    type: String,
    required: true,
  },

  libraryImage: {
    type: String,
    required: true,
  },
});

const physicalModel =
  mongoose.model("PhysicalCampus", physicalSchema) ||
  mongoose.model("PhysicalCampus");
