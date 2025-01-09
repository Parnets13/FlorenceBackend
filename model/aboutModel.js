import mongoose from "mongoose";
// Define the schema for the items in the `whyFlorence` array
const whyFlorenceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});
const aboutOverviewSchema = new mongoose.Schema({
  about: [{ type: String, required: true }],
  image: { type: String, required: true },
  whyFlorence: [whyFlorenceSchema],
});
const aboutOverviewModel =
  mongoose.model("AboutOverview", aboutOverviewSchema) ||
  mongoose.model("AboutOverview");

  export default aboutOverviewModel