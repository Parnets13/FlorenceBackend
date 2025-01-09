import CourseNameModel from "../model/courseNameModel.js";

const addCourseName = async (req, res) => {
    const { name } = req.body;
    try {
        const newCourseName = new CourseNameModel({ name });
        await newCourseName.save();
        return res.status(201).json({
            success: true,
            message: "Course name added successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};


const getAllCourseNames = async (req, res) => {
    try {
        const courseNames = await CourseNameModel.find({});
        return res.status(200).json({
            success: true,
            courseNames,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};


const getCourseNameById = async (req, res) => {
    const { id } = req.params;
    try {
        const courseName = await CourseNameModel.findById(id);
        return res.status(200).json({
            success: true,
            courseName,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

const editCourseName = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedCourseName = await CourseNameModel.findByIdAndUpdate(id, { name }, { new: true });
        return res.status(200).json({
            success: true,
            message: "Course name updated successfully",
            updatedCourseName,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

export {addCourseName, getAllCourseNames, getCourseNameById, editCourseName}