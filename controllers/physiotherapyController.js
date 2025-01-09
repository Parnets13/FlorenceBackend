import physiotheraphyModel from "../model/physiotherapyModel.js";

// Add a new course
 const addCourse = async (req, res) => {
  const { name, eligibility, description, details } = req.body;

  try {
     // Collect all the image paths from the uploaded files
     const imagePaths = req.files
     .map((file) => file.path)
     .join(",")
     .replace(/\\/g, "/"); // Save the file paths as image URLs
   // Create a new gallery document

   const parsedDetails = JSON.parse(details);

    const newCourse = new physiotheraphyModel({
      name,
      eligibility,
      description,
      details:parsedDetails,
      image:imagePaths,
    });

    await newCourse.save();

    return res.status(201).json({
      success: true,
      message: "Course added successfully!",
      course: newCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to add the course.",
      error:error.message
    });
  }
};

// Get all courses
 const getPhysiotherapyCourses = async (req, res) => {
  try {
    const courses = await physiotheraphyModel.find();
    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully!",
      courses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses.",
    });
  }
};

// Update a course by ID
 const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, eligibility, description, details, image } = req.body;

  try {
    const updatedCourse = await physiotheraphyModel.findByIdAndUpdate(
      id,
      { name, eligibility, description, details, image },
      { new: true } // Return the updated document
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully!",
      course: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update the course.",
    });
  }
};

// Delete a course by ID
 const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCourse = await physiotheraphyModel.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete the course.",
    });
  }
};

export { addCourse, getPhysiotherapyCourses, updateCourse, deleteCourse };