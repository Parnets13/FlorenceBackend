import enquiryModel from "../model/enquiryModel.js";

const enqiury = async (req, res) => {
  const { firstName, lastName, phone, email, message } = req.body;
  try {
    const newEnquiry = new enquiryModel({
      firstName,
      lastName,
      phone,
      email,
      message,
    });

    await newEnquiry.save();
    return res.status(201).json({
      success: true,
      message: "Enquiry sent successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getEnquiry = async (req, res) => {
  const enqiury = await enquiryModel.find({}).sort({ createdAt: -1 });
  try {
    return res.status(200).json({
      success: true,
      message: "Enquiry fetched successfully",
      enqiury
    });
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    })
  }
};

// const updateEnquiryStatus = async (req, res) => {
//   const { id, status } = req.body;

//   try {
//     const updatedEnquiry = await enquiryModel.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true, runValidators: true }
//     );

//     if (!updatedEnquiry) {
//       return res.status(404).json({
//         success: false,
//         message: "Enquiry not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Enquiry status updated successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };



const updateEnquiryStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    console.log(status)
    const updatedEnquiry = await enquiryModel.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
    if (!updatedEnquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found", });
    }
    return res.status(200).json({ success: true, message: "Enquiry status updated successfully", data: updatedEnquiry, });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong", error: error.message, });
  }
};



export { enqiury, getEnquiry, updateEnquiryStatus };


