import mongoose from "mongoose";

// Government Order Schema
const govOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  seats: {
    type: Number,
    required: false,
  },
  pdf: {
    type: String,
    required: true,
  },
});

// Course Schema
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  govtOrders: [govOrderSchema],
});

// Institution Schema
const govtOrdersSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  nursingCourses: [courseSchema],
  physiotherapyCourses: [courseSchema],
  nursingAffiliation: {
    type: String,
    required: false,
  },
  nursingAffiliationOrderNumber: {
    type: String,
    required: false,
  },
  nursingAffiliationDate: {
    type: Date,
    required: false,
  },
  physiotherapyAffiliation: {
    type: String,
    required: false,
  },
  physiotherapyAffiliationOrderNumber: {
    type: String,
    required: false,
  },
  physiotherapyAffiliationDate: {
    type: Date,
    required: false,
  },
});

const govtOrderModel = mongoose.model("GovtOrders", govtOrdersSchema);

export default govtOrderModel;
