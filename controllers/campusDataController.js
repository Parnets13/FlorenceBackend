import CampusDataModel from "../model/campusDataModel.js";
import CampusNameModel from "../model/campusNameModel.js";

const addCampusData = async (req, res) => {
    const { title, description,  campusId} = req.body;
    try {
        const campusName = await CampusNameModel.findById(campusId);
        if (!campusName) {
            return res.status(404).json({
                success: false,
                message: "Campus name not found",
            });
        }
        const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

        const newCampusData = new CampusDataModel({
            title,
            description,
            image: imagePath,
            campusId
        });
        await newCampusData.save();
        return res.status(201).json({           
            success: true,
            message: "Campus data added successfully",
            data: newCampusData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
}   

const getCampusData = async (req, res) => {
    try {
        const campusData = await CampusDataModel.find({}).populate("campusId");
        return res.status(200).json({
            success: true,
            message: "Campus data fetched successfully",
            campusData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
}


export { addCampusData , getCampusData };