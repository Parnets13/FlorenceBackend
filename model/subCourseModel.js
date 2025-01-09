import mongoose from 'mongoose';

const subcourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  eligibility: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: Array, required: true },
  image: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
});

const Subcourse = mongoose.model('Subcourse', subcourseSchema);

export default Subcourse;
