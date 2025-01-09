// import eventModel from "../model/eventModel.js";

// const addEvent = async (req, res) => {
//   const { eventName, tag, description, date } = req.body;
//   try {
//     const imagePaths = req.files
//       .map((file) => file.path)
//       .join(",")
//       .replace(/\\/g, "/"); // Save the file paths as image URLs

//     const newEvent = new eventModel({
//       eventName,
//       tag,
//       description,
//       date,
//       image: imagePaths,
//     });

//     await newEvent.save();
//     return res.status(201).json({
//       success: true,
//       message: "Events successfully added",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//       error:error.message
//     });
//   }
// };

// const editEvent = async (req, res) => {
//   const { eventId, eventName, tag, description, date } = req.body;
//   try {
//     // Find the event document by ID
//     const event = await eventModel.findById(eventId);

//     if (!event) {
//       return res.status(404).json({
//         success: false,
//         message: "Event not found",
//       });
//     }

//     // Update the event properties if provided
//     if (eventName) event.eventName = eventName;
//     if (tag) event.tag = tag;
//     if (description) event.description = description;
//     if (date) event.date = date;

//     // Update the image paths if new files are provided
//     if (req.files && req.files.length > 0) {
//       event.image = req.files
//         .map((file) => file.path)
//         .join(",")
//         .replace(/\\/g, "/");
//     }

//     // Save the updated event document
//     await event.save();

//     return res.status(201).json({
//       success: true,
//       message: "Event updated successfully",
//       data: event,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

// const deleteEvent = async (req, res) => {
//     const {id} = req.params;
//     try {
//         const deletedEvent = await eventModel.findByIdAndDelete(id);
//         if(!deletedEvent){
//             return res.status(404).json({
//                 success:false,
//                 message:"Event not found"
//             })
//         }
//         return res.status(200).json({
//             success:true,
//             message:"Event deleted successfully"
//         })
//     } catch (error) {
//         console.error(error)
//         return res.status(500).json({
//             success: false,
//             message:"Something went wrong"
//         })
//     }
// };

// const getEvent = async (req, res) => {
//   const event = await eventModel.find({});
//   try {
//     return res.status(200).json({
//       success: true,
//       message: "Event fetched succesfully",
//       event,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

// export { addEvent, editEvent, deleteEvent, getEvent };
















import eventModel from "../model/eventModel.js";
import path from "path";
import fs from "fs";

// Add Event
const addEvent = async (req, res) => {
  const { eventName, tag, description, date } = req.body;
  try {
    const imagePaths = req.files
      .map((file) => file.path)
      .join(",")
      .replace(/\\/g, "/");

    const newEvent = new eventModel({
      eventName,
      tag,
      description,
      date,
      image: imagePaths,
    });

    await newEvent.save();
    return res.status(201).json({
      success: true,
      message: "Events successfully added",
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

// Edit Event
const editEvent = async (req, res) => {
  const { eventId, eventName, tag, description, date } = req.body;
  try {
    // Find the event document by ID
    const event = await eventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
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

    let imagePaths = event.image ? event.image.split(",") : [];

    if (req.files && req.files.length > 0) {
      deleteOldFiles(imagePaths);
      imagePaths = req.files.map((file) => file.path.replace(/\\/g, "/"));
    }

    // Update the event properties if provided
    if (eventName) event.eventName = eventName;
    if (tag) event.tag = tag;
    if (description) event.description = description;
    if (date) event.date = date;
    event.image = imagePaths.join(",");

    // Save the updated event document
    await event.save();

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
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

// Delete Event
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await eventModel.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Delete old files
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

    let imagePaths = event.image ? event.image.split(",") : [];
    deleteOldFiles(imagePaths);

    await event.remove();

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
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

// Get Events (Latest First)
const getEvent = async (req, res) => {
  try {
    const event = await eventModel.find({}).sort({ date: -1 });
    return res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      event,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export { addEvent, editEvent, deleteEvent, getEvent };
