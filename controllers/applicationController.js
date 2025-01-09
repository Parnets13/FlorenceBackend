import applicationModel from "../model/applicationModel.js";

const addApplication = async (req, res) => {
  const { title } = req.body;
  try {
    const pdfPaths = req.files
      .map((file) => file.path)
      .join(",")
      .replace(/\\/g, "/"); // Save the file paths as image URLs

    const newApplication = new applicationModel({
      title,
      pdf: pdfPaths,
    });

    await newApplication.save();

    return res.status(201).json({
      success: true,
      message: "Application added successfully",
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

const editApplication = async (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  try {
    // If a new PDF is uploaded, save its path
    const pdfPaths = req.files
      .map((file) => file.path)
      .join(",")
      .replace(/\\/g, "/"); // Save the file paths as image URLs

    // Find the application document by ID and update its fields
    const updatedApplication = await applicationModel.findByIdAndUpdate(
      id,
      {
        title,
        pdf: pdfPaths,
      },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: updatedApplication,
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

// const deleteApplication = async (req, res) => {
//     const {id} = req.body;
   
//     try {
//         const deletedApplication = await applicationModel.findByIdAndDelete(id);
//         console.log(deleteApplication)
//         return res.status(200).json({
//             success:true,
//             message:"Application deleted successfully"
//         })
//      } catch (error) {
//         console.error(error)
//         return res.status(500).json({
//             success:false,
//             message:"Something went wrong"
//         })
//     }
// };

const deleteApplication = async (req, res) => {
    const { id } = req.body;
  
    try {
      // Check if ID is provided
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "No ID provided",
        });
      }
  
      // Find and delete the application document by ID
      const deletedApplication = await applicationModel.findByIdAndDelete(id);
  
      // Check if the application was found and deleted
      if (!deletedApplication) {
        return res.status(404).json({
          success: false,
          message: "Application not found",
        });
      }
  
      // Log the deleted application (optional)
      console.log("Deleted application:", deletedApplication);
  
      return res.status(200).json({
        success: true,
        message: "Application deleted successfully",
        data: deletedApplication,
      });
    } catch (error) {
      console.error("Error deleting application:", error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      error: error.message,
      });
    }
  };

  const getApplication = async(req,res) =>{
     try {
      const application = await applicationModel.find({});
      return res.status(200).json({
        success:true,
        message:"Application fetched successfully",
        application
      })
     } catch (error) {
       console.error(error)
       return res.status(500).json({
        success:false,
        message:"Something went wrong"
       })
     }
  }
  
  

export { addApplication, editApplication, deleteApplication ,getApplication  };
