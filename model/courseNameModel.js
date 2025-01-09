import mongoose from 'mongoose';

// Main Course Schema
const courseNameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
}, { timestamps: true });

const CourseNameModel = mongoose.model('CourseName', courseNameSchema);

export default CourseNameModel;
