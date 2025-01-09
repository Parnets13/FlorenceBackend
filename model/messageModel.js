import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  designation: {
    type: String,
    required: true,
  },
  message:{
    type:Array,
    required:true
  },
  image:{
    type:String,
    required:true
  }
});

const messageModel =
  mongoose.model("Message", messageSchema) || mongoose.model("Message");

export default messageModel;
