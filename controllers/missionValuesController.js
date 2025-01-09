// import missionValuesModel from "../model/missionValuesModel.js";

// const missionValues = async (req, res) => {
//   const { mission, values } = req.body;
//   try {
//     const parsedValues = JSON.parse(values);
//     const parsedMission = JSON.parse(mission);
//     const newMissionValues = new missionValuesModel({
//       mission: parsedMission,
//       values: parsedValues,
//     });

//     await newMissionValues.save();
//     return res.status(201).json({
//       success: true,
//       message: "Mission values added successfully",
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

// const editMissionValues = async (req, res) => {
//   const { id, mission, values } = req.body;
//   try {
//     const missionValues = await missionValuesModel.findById(id);
//     if (mission) missionValues.mission = mission;
//     if (values) missionValues.values = values;

//     await missionValues.save();
//     return res.status(201).json({
//       success: true,
//       message: "Mission & Values edited successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

// const getMissionValues = async (req, res) => {
//   const missionValues = await missionValuesModel.find({});
//   return res.status(200).json({
//     success: true,
//     message: "Mission vision successfully fetched",
//     missionValues,
//   });
// };

// export { missionValues, getMissionValues, editMissionValues };



import missionValuesModel from "../model/missionValuesModel.js";

const missionValues = async (req, res) => {
  const { mission, values } = req.body;
  try {
    const newMissionValues = new missionValuesModel({
      mission,
      values,
    });

    await newMissionValues.save();
    return res.status(201).json({
      success: true,
      message: "Mission values added successfully",
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

const editMissionValues = async (req, res) => {
  const { id, mission, values } = req.body;
  try {
    const missionValues = await missionValuesModel.findById(id);
    if (!missionValues) {
      return res.status(404).json({
        success: false,
        message: "Mission values not found",
      });
    }

    if (mission) missionValues.mission = mission;
    if (values) missionValues.values = values;

    await missionValues.save();
    return res.status(200).json({
      success: true,
      message: "Mission & Values edited successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getMissionValues = async (req, res) => {
  try {
    const missionValues = await missionValuesModel.find({});
    return res.status(200).json({
      success: true,
      message: "Mission vision successfully fetched",
      missionValues,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export { missionValues, getMissionValues, editMissionValues };
