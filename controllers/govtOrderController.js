import govtOrderModel from "../model/govtOrderModel.js";

// Add new institution
export const addGovtOrder = async (req, res) => {
  const {
    description,
    nursingCourses,
    physiotherapyCourses,
    nursingAffiliation,
    nursingAffiliationOrderNumber,
    nursingAffiliationDate,
    physiotherapyAffiliation,
    physiotherapyAffiliationOrderNumber,
    physiotherapyAffiliationDate,
  } = req.body;

  try {
    // const pdfPaths = req.files
    //   .map((file) => file.path)
    //   .join(",")
    //   .replace(/\\/g, "/");

    const parsedNursingCourses = JSON.parse(nursingCourses);
    const parsedPhysiotherapyCourses = JSON.parse(physiotherapyCourses);

    // Add PDF paths to government orders
    // parsedNursingCourses.forEach((course) => {
    //   course.govtOrders.forEach((order) => {
    //     order.pdf = path.join("uploads", order.pdf);
    //     // Adjust the path based on your setup
    //   });
    // });
    // parsedPhysiotherapyCourses.forEach((course) => {
    //   course.govtOrders.forEach((order) => {
    //     order.pdf = path.join("uploads", order.pdf); // Adjust the path based on your setup
    //   });
    // });

    parsedNursingCourses.forEach((course, courseIndex) => {
      course.govtOrders.forEach((order, orderIndex) => {
        order.pdf = req.files[
          `pdf${courseIndex * 3 + orderIndex + 1}`
        ][0].path.replace(/\\/g, "/");
      });
    });
    parsedPhysiotherapyCourses.forEach((course, courseIndex) => {
      course.govtOrders.forEach((order, orderIndex) => {
        order.pdf = req.files[
          `pdf${6 + courseIndex * 2 + orderIndex + 1}`
        ][0].path.replace(/\\/g, "/");
      });
    });

    const newGovtOrder = new govtOrderModel({
      description,
      nursingCourses: parsedNursingCourses,
      physiotherapyCourses: parsedPhysiotherapyCourses,
      nursingAffiliation,
      nursingAffiliationOrderNumber,
      nursingAffiliationDate,
      physiotherapyAffiliation,
      physiotherapyAffiliationOrderNumber,
      physiotherapyAffiliationDate,
    });

    await newGovtOrder.save();
    return res.status(201).json({
      success: true,
      message: "Govt Order successfully added",
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

// Edit institution
export const editGovtOrder = async (req, res) => {
  const {
    id,
    description,
    nursingCourses,
    physiotherapyCourses,
    nursingAffiliation,
    nursingAffiliationOrderNumber,
    nursingAffiliationDate,
    physiotherapyAffiliation,
    physiotherapyAffiliationOrderNumber,
    physiotherapyAffiliationDate,
  } = req.body;

  try {
    const newGovtOrder = await govtOrderModel.findById(id);

    if (!newGovtOrder) {
      return res.status(404).json({
        success: false,
        message: "Govt order not found",
      });
    }

    // Update institution properties
    if (description) institution.description = description;
    if (nursingCourses) institution.nursingCourses = nursingCourses;
    if (physiotherapyCourses)
      institution.physiotherapyCourses = physiotherapyCourses;
    if (nursingAffiliation) institution.nursingAffiliation = nursingAffiliation;
    if (nursingAffiliationOrderNumber)
      institution.nursingAffiliationOrderNumber = nursingAffiliationOrderNumber;
    if (nursingAffiliationDate)
      institution.nursingAffiliationDate = nursingAffiliationDate;
    if (physiotherapyAffiliation)
      institution.physiotherapyAffiliation = physiotherapyAffiliation;
    if (physiotherapyAffiliationOrderNumber)
      institution.physiotherapyAffiliationOrderNumber =
        physiotherapyAffiliationOrderNumber;
    if (physiotherapyAffiliationDate)
      institution.physiotherapyAffiliationDate = physiotherapyAffiliationDate;

    await newGovtOrder.save();

    return res.status(200).json({
      success: true,
      message: "Institution successfully updated",
      data: institution,
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

// Get all institutions
export const getGovtOrders = async (req, res) => {
  try {
    const govtOrders = await govtOrderModel.find({});
    return res.status(200).json({
      success: true,
      message: "Govt Orders fetched successfully",
      govtOrders
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

// Delete institution
export const deleteGovtOrders = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGovtOrder = await govtOrderModel.findByIdAndDelete(id);

    if (!deletedGovtOrder) {
      return res.status(404).json({
        success: false,
        message: "Govt order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Govt Order successfully deleted",
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
