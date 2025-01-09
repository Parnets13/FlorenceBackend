import CampusNameModel from "../model/campusNameModel.js";

const addCampusName = async (req, res) => {
    const { name , description} = req.body;
    try {
        const newCampusName = new CampusNameModel({ name , description});
        await newCampusName.save();
        return res.status(201).json({ success: true, message: "Campus name added successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong" , error: error.message});
    }
}

const getCampusName = async (req, res) => {
    try {
        const campusName = await CampusNameModel.find({});
        return res.status(200).json({ success: true, message: "Campus name fetched successfully", campusName });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
}

export { addCampusName , getCampusName} 