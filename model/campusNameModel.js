import mongoose from "mongoose";

const campusNameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    }
});

const CampusNameModel = mongoose.model("CampusName", campusNameSchema);

export default CampusNameModel;