import mongoose from "mongoose";

const campusDataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    campusId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CampusName",
        required: true
    }
});

const CampusDataModel = mongoose.model("CampusData", campusDataSchema);

export default CampusDataModel;