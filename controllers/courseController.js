

import CourseNameModel from "../model/courseNameModel.js";
import Course from "./../model/courseModel.js";
import fs from 'fs';
import path from 'path';

const addCourse = async (req, res) => {
  const {
    name,
    eligibility,
    description,
    qualification,
    percentage,
    certificates,
    workExperience,
    mediumOfInstruction,
    courseId,
  } = req.body;

  if (!name || !courseId) {
    return res.status(400).json({ success: false, message: "Name and courseId are required." });
  }

  const imagePath = req.file?.path.replace(/\\/g, "/") || "";

  try {
    const course = await CourseNameModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found." });
    }

    const newCourse = new Course({
      name,
      eligibility,
      description,
      details: [
        { qualification },
        { percentage },
        { certificates },
        { workExperience },
        { mediumOfInstruction },
      ],
      courseId,
      image: imagePath,
    });

    await newCourse.save();
    res.status(201).json({ success: true, message: "Course added successfully" });
  } catch (error) {
    console.error("Error adding course:", error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Duplicate key error.", error: error.message });
    }
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
};


const getCourse = async (req, res) => {
  try {
    const course = await Course.find({}).populate("courseId");
    res.status(200).json({ success: true, message: "Course fetched successfully", course });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
};




const editCourse = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    eligibility,
    description,
    qualification,
    percentage,
    certificates,
    workExperience,
    mediumOfInstruction,
    courseId,
  } = req.body;

  const imagePath = req.file?.path.replace(/\\/g, "/") || "";

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found." });
    }

    // Delete the previous image if a new image is uploaded
    if (imagePath && course.image) {
      const oldImagePath = path.resolve(course.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    course.name = name || course.name;
    course.eligibility = eligibility || course.eligibility;
    course.description = description || course.description;
    course.details = [
      { qualification: qualification || course.details[0].qualification },
      { percentage: percentage || course.details[1].percentage },
      { certificates: certificates || course.details[2].certificates },
      { workExperience: workExperience || course.details[3].workExperience },
      { mediumOfInstruction: mediumOfInstruction || course.details[4].mediumOfInstruction },
    ];
    course.courseId = courseId || course.courseId;
    course.image = imagePath || course.image;

    await course.save();
    res.status(200).json({ success: true, message: "Course updated successfully", course });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found." });
    }

    // Delete the image if it exists
    if (course.image) {
      const imagePath = path.resolve(course.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Course.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
};



export { addCourse , getCourse , editCourse , deleteCourse };