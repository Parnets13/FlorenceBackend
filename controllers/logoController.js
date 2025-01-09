import logoModel from "../model/logoModel.js";
import path from "path";
import fs from "fs";

const logoUpload = async (req, res) => {
  try {
    const imagePaths = req.files
      .map((file) => file.path)
      .join(",")
      .replace(/\\/g, "/"); // Save the file paths as image URLs
    const newLogo = await logoModel({
       logo:imagePaths
    });

    await newLogo.save();

    return res.status(201).json({
      success: true,
      message: "Logo uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const logoEdit = async (req, res) => {
  try {
    const { logo_id } = req.body;

    // Find the existing logo document
    const logoDoc = await logoModel.findById(logo_id);

    if (!logoDoc) {
      return res.status(404).json({
        success: false,
        message: "Logo not found for the specified ID",
      });
    }

    // If new files are uploaded, delete the old logo file
    if (req.files && req.files.length > 0) {
      const oldImagePath = logoDoc.logo;

      // Delete the old file from the filesystem
      const oldFilePath = path.resolve(oldImagePath); // Resolve the full file path
      fs.unlink(oldFilePath, (err) => {
        if (err) {
          console.error(`Failed to delete file ${oldFilePath}:`, err.message);
        }
      });

      // Save the new image paths
      const newImagePaths = req.files
        .map((file) => file.path)
        .join(",")
        .replace(/\\/g, "/");

      logoDoc.logo = newImagePaths;
    }

    // Save the updated logo document
    await logoDoc.save();

    return res.status(200).json({
      success: true,
      message: "Logo updated successfully",
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

const logoDelete = async (req, res) => {
  try {
    // Extract logo_id from the request body
    const { logo_id } = req.body;
    console.log("first", logo_id);

    if (!logo_id) {
      return res.status(400).json({
        success: false,
        message: "logo_id is required",
      });
    }

    // Find the logo document by ID
    const logoDoc = await logoModel.findById(logo_id);

    if (!logoDoc) {
      return res.status(404).json({
        success: false,
        message: "Logo not found for the specified ID",
      });
    }

    // Get the path to the logo file
    const filePath = path.join(__dirname, "..", logoDoc.logo);

    // Remove the file from the filesystem
    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Failed to delete the logo file from the filesystem",
        });
      }

      // Remove the document from the database
      await logoModel.findByIdAndDelete(logo_id);

      return res.status(200).json({
        success: true,
        message: "Logo deleted successfully",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getLogo = async (req, res) => {
  try {
    const logo = await logoModel.find({});
    return res.status(200).json({
      success: true,
      message: "Logo added successfully",
      logo,
    });
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      success: flase,
      message: "Something went wrong",
    });
  }
};

export { logoUpload, logoEdit, logoDelete, getLogo };
