// // import messageModel from "../model/messageModel.js";

// // const addMessage = async (req, res) => {
// //   const { designation, message } = req.body;
// //   try {
// //     const imagePaths = req.files
// //       .map((file) => file.path)
// //       .join(",")
// //       .replace(/\\/g, "/"); // Save the file paths as image URLs

// //     const newMessage = new messageModel({
// //       designation,
// //       message,
// //       image: imagePaths,
// //     });

// //     await newMessage.save();

// //     return res.status(201).json({
// //       success: true,
// //       message: "Message addded successfully",
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Something went wrong",
// //     });
// //   }
// // };

// // const getMessage = async (req, res) => {
// //   try {
// //     const message = await messageModel.find({});
// //     return res.status(200).json({
// //       success: true,
// //       message: "Message fetched successfully",
// //       message,
// //     });
// //   } catch (error) {
// //     return res.status(500).json({
// //       success: false,
// //       message: "Something went wrong",
// //     });
// //   }
// // };

// // const editMessage = async (req, res) => {
// //   const { id, designation, message } = req.body;
// //   try {
// //     const imagePaths = req.files
// //       .map((file) => file.path)
// //       .join(",")
// //       .replace(/\\/g, "/"); // Save the file paths as image URLs

// //     const updatedMessage = await messageModel.findByIdAndUpdate(
// //       id,
// //       {
// //         designation,
// //         message,
// //         ...(imagePaths && { image: imagePaths }), // Only include image if files were uploaded
// //       },
// //       { new: true, runValidators: true }
// //     );

// //     if (!updatedMessage) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Message not found",
// //       });
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       message: "Message updated successfully",
// //       data: updatedMessage,
// //     });
// //   } catch (error) {
// //    console.error(error)
// //    return res.status(500).json({
// //       success:false,
// //       message:"Something went wrong"
// //    })
// //   }
// // };

// // export { addMessage, getMessage, editMessage };




// import messageModel from "../model/messageModel.js";
// import path from "path";
// import fs from "fs";

// // Add Message
// const addMessage = async (req, res) => {
//   const { designation, message } = req.body;
//   try {
//     const imagePaths = req.files
//       .map((file) => file.path)
//       .join(",")
//       .replace(/\\/g, "/");

//     const newMessage = new messageModel({
//       designation,
//       message,
//       image: imagePaths,
//     });

//     await newMessage.save();

//     return res.status(201).json({
//       success: true,
//       message: "Message added successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

// // Get Message
// const getMessage = async (req, res) => {
//   try {
//     const message = await messageModel.find({});
//     return res.status(200).json({
//       success: true,
//       message: "Message fetched successfully",
//       message,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

// // Edit Message
// const editMessage = async (req, res) => {
//   const { id, designation, message } = req.body;
//   try {
//     // Find the existing message document by ID
//     const existingMessage = await messageModel.findById(id);

//     if (!existingMessage) {
//       return res.status(404).json({
//         success: false,
//         message: "Message not found",
//       });
//     }

//     // Delete old files if new files are provided
//     const deleteOldFiles = (filePaths) => {
//       filePaths.forEach((filePath) => {
//         const resolvedPath = path.resolve(filePath);
//         fs.unlink(resolvedPath, (err) => {
//           if (err) {
//             console.error(`Failed to delete file ${resolvedPath}:`, err.message);
//           }
//         });
//       });
//     };

//     let imagePaths = existingMessage.image ? existingMessage.image.split(",") : [];

//     // Update the image paths if new files are provided
//     if (req.files && req.files.length > 0) {
//       // Delete old images
//       deleteOldFiles(imagePaths);
//       // Update to new images
//       imagePaths = req.files.map((file) => file.path.replace(/\\/g, "/"));
//     }

//     const updatedMessage = await messageModel.findByIdAndUpdate(
//       id,
//       {
//         designation,
//         message,
//         ...(imagePaths.length && { image: imagePaths.join(",") }),
//       },
//       { new: true, runValidators: true }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Message updated successfully",
//       data: updatedMessage,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

// export { addMessage, getMessage, editMessage };













import messageModel from "../model/messageModel.js";
import path from "path";
import fs from "fs";

// Add Message
const addMessage = async (req, res) => {
  const { designation, message } = req.body;
  try {
    const imagePaths = req.files
      .map((file) => file.path)
      .join(",")
      .replace(/\\/g, "/");

    const newMessage = new messageModel({
      designation,
      message,
      image: imagePaths,
    });

    await newMessage.save();

    return res.status(201).json({
      success: true,
      message: "Message added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Get Message
const getMessage = async (req, res) => {
  try {
    const message = await messageModel.find({});
    return res.status(200).json({
      success: true,
      message: "Message fetched successfully",
      message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Edit Message
const editMessage = async (req, res) => {
  const { id, designation, message } = req.body;
  try {
    // Find the existing message document by ID
    const existingMessage = await messageModel.findById(id);

    if (!existingMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
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

    let imagePaths = existingMessage.image ? existingMessage.image.split(",") : [];

    // Update the image paths if new files are provided
    if (req.files && req.files.length > 0) {
      // Delete old images
      deleteOldFiles(imagePaths);
      // Update to new images
      imagePaths = req.files.map((file) => file.path.replace(/\\/g, "/"));
    }

    const updatedMessage = await messageModel.findByIdAndUpdate(
      id,
      {
        designation,
        message,
        ...(imagePaths.length && { image: imagePaths.join(",") }),
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Message updated successfully",
      data: updatedMessage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Delete Message
const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the message by ID
    const message = await messageModel.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Delete associated images
    const deleteImageFiles = (filePaths) => {
      filePaths.forEach((filePath) => {
        const resolvedPath = path.resolve(filePath);
        fs.unlink(resolvedPath, (err) => {
          if (err) {
            console.error(`Failed to delete file ${resolvedPath}:`, err.message);
          }
        });
      });
    };

    if (message.image) {
      const imagePaths = message.image.split(",");
      deleteImageFiles(imagePaths);
    }

    // Delete the message from the database
    await messageModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export { addMessage, getMessage, editMessage, deleteMessage };


