import galleryModel from "../model/GalleryModel.js";
import path from "path";
import fs from "fs";

const addGallery = async (req, res) => {
  try {
    // Collect all the image paths from the uploaded files
    const imagePaths = req.files
      .map((file) => file.path)
      .join(",")
      .replace(/\\/g, "/"); // Save the file paths as image URLs
    // Create a new gallery document
    const newGallery = new galleryModel({ image: imagePaths }); // Save the document
    await newGallery.save();
    return res.status(201).json({
      success: true,
      message: "Images added to gallery successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const getGallery = async (req, res) => {
  const gallery = await galleryModel.find({});
  try {
    return res.status(200).json({
      success: true,
      message: "Gallery items fetched successfully",
      gallery,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const deleteGallery = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedImage = await galleryModel.findByIdAndDelete(id);

    const imagePaths = deletedImage.image.split(",");

    imagePaths.forEach((imagePath) => {
      const filePath = path.resolve(imagePath); // Resolve the full path
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete file ${filePath}:`, err.message);
        }
      });
    });

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
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

const editGallery = async (req, res) => {
  const { id } = req.body;
  try {
    const galleryItem = await galleryModel.findById(id);
    if (!galleryItem) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    } // Update the image paths if new files are uploaded

     // If new files are uploaded, delete the old files
     if (req.files && req.files.length > 0) {
      const oldImagePaths = galleryItem.image.split(",");

      // Delete the old files
      oldImagePaths.forEach((imagePath) => {
        const filePath = path.resolve(imagePath); // Resolve the full path
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Failed to delete file ${filePath}:`, err.message);
          }
        });
      });
    }
    if (req.files && req.files.length > 0) {
      const imagePaths = req.files
        .map((file) => file.path)
        .join(",")
        .replace(/\\/g, "/");
      galleryItem.image = imagePaths;
    }
    // Save the updated gallery document
    await galleryItem.save();
    return res
      .status(200)
      .json({
        success: true,
        message: "Gallery item updated successfully",
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong", error:error.message });
  }
};

export { addGallery, getGallery, deleteGallery , editGallery };
