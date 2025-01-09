// import aboutOverviewModel from "../model/aboutModel.js";

// // Add a new About Overview
// const addAboutOverview = async (req, res) => {
//   const { about, whyFlorence } = req.body;

//   try {
//     const parsedAbout = JSON.parse(about);
//     const parsedWhyFlorence = JSON.parse(whyFlorence);
//     const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;
//     console.log(parsedAbout, parsedWhyFlorence, imagePath)
//     const newAboutOverview = new aboutOverviewModel({
//       about: parsedAbout,
//       image: imagePath,
//       whyFlorence: parsedWhyFlorence,
//     });

//     await newAboutOverview.save();

//     return res.status(201).json({
//       success: true,
//       message: "About Overview added successfully",
//       data: newAboutOverview,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };

// // Get all About Overviews
// const getAboutOverviews = async (req, res) => {
//   try {
//     const about = await aboutOverviewModel.find();
//     return res.status(200).json({
//       success: true,
//       message: "About Overviews fetched successfully",
//       about
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };


// // Edit About Overview
// const editAboutOverview = async (req, res) => {
//   const { id, about, whyFlorence } = req.body;

//   try {
//     // Ensure id is provided
//     if (!id) {
//       return res.status(400).json({
//         success: false,
//         message: "ID is required",
//       });
//     }

//     // Find the existing about overview document by ID
//     const aboutOverview = await aboutOverviewModel.findById(id);

//     if (!aboutOverview) {
//       return res.status(404).json({
//         success: false,
//         message: "About Overview not found",
//       });
//     }

//     // Update the fields if provided
//     if (about) {
//       aboutOverview.about = JSON.parse(about);
//     }

//     if (whyFlorence) {
//       aboutOverview.whyFlorence = JSON.parse(whyFlorence);
//     }

//     // Update the image path if a new file is provided
//     if (req.file) {
//       aboutOverview.image = req.file.path.replace(/\\/g, "/");
//     }

//     // Save the updated about overview document
//     await aboutOverview.save();

//     return res.status(200).json({
//       success: true,
//       message: "About Overview updated successfully",
//       data: aboutOverview,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };



// export { addAboutOverview, getAboutOverviews , editAboutOverview };











import aboutOverviewModel from "../model/aboutModel.js";
import path from "path";
import fs from "fs";

// Add a new About Overview
const addAboutOverview = async (req, res) => {
  const { about, whyFlorence } = req.body;

  try {
    const parsedAbout = JSON.parse(about);
    const parsedWhyFlorence = JSON.parse(whyFlorence);
    const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;
    console.log(parsedAbout, parsedWhyFlorence, imagePath)
    const newAboutOverview = new aboutOverviewModel({
      about: parsedAbout,
      image: imagePath,
      whyFlorence: parsedWhyFlorence,
    });

    await newAboutOverview.save();

    return res.status(201).json({
      success: true,
      message: "About Overview added successfully",
      data: newAboutOverview,
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

// Get all About Overviews
const getAboutOverviews = async (req, res) => {
  try {
    const about = await aboutOverviewModel.find();
    return res.status(200).json({
      success: true,
      message: "About Overviews fetched successfully",
      about
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

// Edit About Overview
const editAboutOverview = async (req, res) => {
  const { id, about, whyFlorence } = req.body;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
      });
    }

    const aboutOverview = await aboutOverviewModel.findById(id);

    if (!aboutOverview) {
      return res.status(404).json({
        success: false,
        message: "About Overview not found",
      });
    }

    const deleteOldFile = (filePath) => {
      if (filePath) {
        const resolvedPath = path.resolve(filePath);
        fs.unlink(resolvedPath, (err) => {
          if (err) {
            console.error(`Failed to delete file ${resolvedPath}:`, err.message);
          }
        });
      }
    };

    // Update the fields if provided
    if (about) {
      aboutOverview.about = JSON.parse(about);
    }

    if (whyFlorence) {
      aboutOverview.whyFlorence = JSON.parse(whyFlorence);
    }

    // Update the image path if a new file is provided and delete the old image
    if (req.file) {
      deleteOldFile(aboutOverview.image);
      aboutOverview.image = req.file.path.replace(/\\/g, "/");
    }

    await aboutOverview.save();

    return res.status(200).json({
      success: true,
      message: "About Overview updated successfully",
      data: aboutOverview,
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

export { addAboutOverview, getAboutOverviews, editAboutOverview };
