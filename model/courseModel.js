import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseName", // Reference to the main course
    required: true,
  },
  eligibility: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: Array, required: true },
  image: { type: String, required: true },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
