

// import principalModel from "../model/principalModel.js";

// const addPrincipal = async (req, res) => {
//   const {
//     name,
//     qualification,
//     designation,
//     experienceYears,
//     contactNo,
//     message,
//     quote,
//     additionalMessage,
//   } = req.body;
//   try {
//     const imagePaths = req.files
//       .map((file) => file.path)
//       .join(",")
//       .replace(/\\/g, "/"); // Save the file paths as image URLs

//     const newPrincipal = new principalModel({
//       name,
//       qualification,
//       designation,
//       experienceYears,
//       contactNo,
//       message,
//       quote,
//       additionalMessage,
//       image: imagePaths,
//     });

//     await newPrincipal.save();

//     return res.status(201).json({
//       success: true,
//       message: "Principal added successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

// const getPrincipal = async (req, res) => {
//   try {
//     const principal = await principalModel.find({});
//     return res.status(200).json({
//       success: true,
//       message: "Principal data fetched successfully",
//       principal,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

// const editPrincipal = async (req, res) => {
//   const {
//     name,
//     qualification,
//     designation,
//     experienceYears,
//     contactNo,
//     message,
//     quote,
//     additionalMessage,
//     id
//   } = req.body;
  
//   try {
//     const imagePaths = req.files
//       ? req.files.map((file) => file.path).join(",").replace(/\\/g, "/")
//       : null; // Save the file paths as image URLs if files are provided

//     const updatedPrincipal = await principalModel.findByIdAndUpdate(
//       id,
//       {
//         name,
//         qualification,
//         designation,
//         experienceYears,
//         contactNo,
//         message,
//         quote,
//         additionalMessage,
//         ...(imagePaths && { image: imagePaths }), // Only include image if files were uploaded
//       },
//       { new: true, runValidators: true }
//     );

//     if (!updatedPrincipal) {
//       return res.status(404).json({
//         success: false,
//         message: "Principal not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Principal updated successfully",
//       data: updatedPrincipal,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//       error: error.message
//     });
//   }
// };

// export { addPrincipal, getPrincipal, editPrincipal };









import principalModel from "../model/principalModel.js";
import path from "path";
import fs from "fs";

// Add Principal
const addPrincipal = async (req, res) => {
  const {
    name,
    qualification,
    designation,
    experienceYears,
    contactNo,
    message,
    quote,
    additionalMessage,
  } = req.body;
  try {
    const imagePaths = req.files
      .map((file) => file.path)
      .join(",")
      .replace(/\\/g, "/"); // Save the file paths as image URLs

    const newPrincipal = new principalModel({
      name,
      qualification,
      designation,
      experienceYears,
      contactNo,
      message,
      quote,
      additionalMessage,
      image: imagePaths,
    });

    await newPrincipal.save();

    return res.status(201).json({
      success: true,
      message: "Principal added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Get Principal
const getPrincipal = async (req, res) => {
  try {
    const principal = await principalModel.find({});
    return res.status(200).json({
      success: true,
      message: "Principal data fetched successfully",
      principal,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Edit Principal
const editPrincipal = async (req, res) => {
  const {
    name,
    qualification,
    designation,
    experienceYears,
    contactNo,
    message,
    quote,
    additionalMessage,
    id,
  } = req.body;

  try {
    // Find the existing principal document by ID
    const existingPrincipal = await principalModel.findById(id);

    if (!existingPrincipal) {
      return res.status(404).json({
        success: false,
        message: "Principal not found",
      });
    }

    // Delete old files if new files are provided
    const deleteOldFiles = (filePaths) => {
      filePaths.forEach((filePath) => {
        const resolvedPath = path.resolve(filePath);
        fs.unlink(resolvedPath, (err) => {
          if (err) {
            console.error(`Failed to delete file ${resolvedPath}:`, err.message);
          }
        });
      });
    };

    let imagePaths = existingPrincipal.image
      ? existingPrincipal.image.split(",")
      : [];

    // Update the image paths if new files are provided
    if (req.files && req.files.length > 0) {
      // Delete old images
      deleteOldFiles(imagePaths);
      // Update to new images
      imagePaths = req.files.map((file) => file.path.replace(/\\/g, "/"));
    }

    const updatedPrincipal = await principalModel.findByIdAndUpdate(
      id,
      {
        name,
        qualification,
        designation,
        experienceYears,
        contactNo,
        message,
        quote,
        additionalMessage,
        ...(imagePaths.length && { image: imagePaths.join(",") }),
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Principal updated successfully",
      data: updatedPrincipal,
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


// Delete Controller
const deletePrincipal = async (req, res) => {
  const { id } = req.params;
  try {
    const principal = await principalModel.findById(id);
    if (!principal) {
      return res.status(404).json({ success: false, message: "Principal not found" });
    }

    // Delete the image file
    if (principal.image) {
      fs.unlink(principal.image, (err) => {
        if (err) {
          console.error("Error deleting image file:", err);
        }
      });
    }

    await principalModel.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Principal deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong" , error: error.message});
  }
};

export { addPrincipal, getPrincipal, editPrincipal ,deletePrincipal };
