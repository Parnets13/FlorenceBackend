import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Close"],
      default: "Open",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);
  
  const enquiryModel = mongoose.model("Enquiry", enquirySchema);
  export default enquiryModel;
  