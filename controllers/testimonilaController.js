import testimonialModel from "../model/testimonialModel.js";

const addTestimonial = async (req, res) => {
  const { name, comment, course } = req.body;
  try {
    const imagePaths = req.files
      .map((file) => file.path)
      .join(",")
      .replace(/\\/g, "/"); // Save the file paths as image URLs
    const newTestimonial = new testimonialModel({
      name,
      comment,
      course,
      profile: imagePaths,
    });

    await newTestimonial.save();
    return res.status(201).json({
      success: true,
      message: "Testimonial added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const editTestimonial = async (req, res) => {
  const { id, name, comment, course } = req.body;
  try {
    // Find the existing testimonial document by ID
    const testimonial = await testimonialModel.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    // Update the fields if provided
    if (name) testimonial.name = name;
    if (comment) testimonial.comment = comment;
    if (course) testimonial.course = course;

    // Update the profile image if a new file is provided
    if (req.files && req.files.length > 0) {
      const imagePaths = req.files
        .map((file) => file.path)
        .join(",")
        .replace(/\\/g, "/"); // Save the file paths as image URLs
      testimonial.profile = imagePaths;
    }

    // Save the updated testimonial document
    await testimonial.save();

    return res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
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

const deleteTestimonial = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTestimonial = await testimonialModel.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getTestimonail = async (req, res) => {
  const testimonial = await testimonialModel.find({});
  try {
    return res.status(200).json({
      success: true,
      message: "Testimonial fetched successfully",
      testimonial,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export { addTestimonial, deleteTestimonial, getTestimonail, editTestimonial };
