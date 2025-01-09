import NursingModel from "../model/nursingModel.js";

// Add a new course
const addNursingCourse = async (req, res) => {
  const { name, eligibility, description, details } = req.body;
  const parsedDetails = JSON.parse(details);
  try {
    // Collect all the image paths from the uploaded files
    const imagePaths = req.files
      .map((file) => file.path)
      .join(",")
      .replace(/\\/g, "/"); // Save the file paths as image URLs
    // Create a new gallery document

    const newCourse = new NursingModel({
      name,
      eligibility,
      description,
      details: parsedDetails,
      image: imagePaths,
    });

    await newCourse.save();

    res.status(201).json({
      success: true,
      message: "Nursing course added successfully",
      course: newCourse,
      image: imagePaths,
    });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add the nursing course",
    });
  }
};

// Get all courses
const getNursingCourses = async (req, res) => {
  try {
    const courses = await NursingModel.find({});
    res.status(200).json({
      success: true,
      message: "Nursing courses fetched successfully",
      courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch nursing courses",
    });
  }
};

// Get a single course by ID
const getNursingCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await NursingCourse.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Nursing course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nursing course fetched successfully",
      nursing,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch the nursing course",
      error:error.message
    });
  }
};

// Update a course
const updateNursingCourse = async (req, res) => {
  const { id } = req.body;
  const { name, eligibility, description, details } = req.body;
  // const parsedDetails = JSON.parse(details);
      // Collect all the image paths from the uploaded files
      const imagePaths = req.files
      .map((file) => file.path)
      .join(",")
      .replace(/\\/g, "/"); // Save the file paths as image URLs
    // Create a new gallery document
  try {
    const updatedCourse = await NursingModel.findByIdAndUpdate(
      id,
      { name, eligibility, description, details, image:imagePaths },
      { new: true } // Return the updated document
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Nursing course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nursing course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update the nursing course",
      error:error.message
    });
  }
};

// Delete a course
const deleteNursingCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCourse = await NursingCourse.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: "Nursing course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nursing course deleted successfully",
      course: deletedCourse,
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete the nursing course",
    });
  }
};

export {
  addNursingCourse,
  getNursingCourses,
  getNursingCourseById,
  updateNursingCourse,
  deleteNursingCourse,
};
