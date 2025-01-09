import mongoose from "mongoose";

const principalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qualification: { type: String, required: true },
  designation: { type: String, required: true },
  experienceYears: { type: Number, required: true },
  contactNo: { type: String, required: true },
  message: { type: String, required: true },
  quote: { type: String, required: true },
  additionalMessage: { type: String, required: true },
  image: { type: String, required: true },
});

const principalModel =
  mongoose.model("Principal", principalSchema) || mongoose.model("Princiapl");

export default principalModel;
