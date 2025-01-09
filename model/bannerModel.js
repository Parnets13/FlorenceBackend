import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  banner1_image: {
    type: String,
    required: true,
  },
  banner1_heading: {
    type: String,
    required: true,
  },
  banner2_image: {
    type: String,
    required: true,
  },
  banner2_heading: {
    type: String,
    required: true,
  },
  banner3_image: {
    type: String,
    required: true,
  },
  banner3_heading: {
    type: String,
    required: true,
  },
});

const bannerModel = mongoose.model('Banner',bannerSchema) || mongoose.model('Banner');

export default bannerModel;
