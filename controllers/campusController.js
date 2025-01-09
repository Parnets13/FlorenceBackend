import campusModel from "./../model/campusModel.js";

// const addCampus = async (req, res) => {
//   const { title, description, facilities } = req.body;

//   try {
//     // Create a new campus document

//     const parsedFacilities = JSON.parse(facilities);

//     const imagePath = req.file.path.replace(/\\/g, "/");

//     //Add image paths to facilities
//     const updatedFacilities = parsedFacilities.map((facility) => ({
//       ...facility,
//       facilityImage: imagePath,
//     }));

//     const newCampus = new campusModel({
//       title,
//       description,
//       facilities: updatedFacilities, // Assuming facilities is already an array
//     });

//     // Save the document
//     await newCampus.save();

//     return res.status(201).json({
//       success: true,
//       message: "Campus added successfully",
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


const addCampus = async (req, res) => {
  const { title, description, facilities } = req.body;

  try {
    // Parse facilities array from the request body
    const parsedFacilities = JSON.parse(facilities);

    // Check if req.files is defined and properly structured
    let imagePaths = [];
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      imagePaths = req.files.map(file => file.path.replace(/\\/g, "/"));
    }

    // Assign image paths to facilities
    const updatedFacilities = parsedFacilities.map((facility, index) => ({
      ...facility,
      facilityImage: imagePaths[index] || "",
    }));

    // Create a new campus document
    const newCampus = new campusModel({
      title,
      description,
      facilities: updatedFacilities,
    });

    // Save the document
    await newCampus.save();

    return res.status(201).json({
      success: true,
      message: "Campus added successfully",
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



const getCampus = async (req, res) => {
  try {
    const campus = await campusModel.find({});
    return res.status(200).json({
      success: true,
      message: "Campus fetched successfully",
      campus,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};



const editCampus = async (req, res) => {
  const { id, title, description, facilities } = req.body;

  try {
    const parsedFacilities = JSON.parse(facilities);

    // Check if req.files is defined and properly structured
    let imagePath = [];
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      imagePath = req.files.map(file => file.path.replace(/\\/g, "/"));
    }

    // Update facilities with the correct image paths
    const updatedFacilities = parsedFacilities.map((facility, index) => ({
      ...facility,
      facilityImage: imagePath[index] || facility.facilityImage,
    }));

    const updatedCampus = await campusModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        facilities: updatedFacilities,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCampus) {
      return res.status(404).json({
        success: false,
        message: "Campus not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Campus updated successfully",
      data: updatedCampus,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error:error.message
    });
  }
};



export { addCampus, getCampus, editCampus };



