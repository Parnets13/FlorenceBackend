
import bannerModel from "../model/bannerModel.js";
import path from "path";
import fs from "fs";

const addHomeBanner = async (req, res) => {
  try {
    const { banner1_heading, banner2_heading, banner3_heading } = req.body;
    console.log(banner1_heading, banner2_heading, banner3_heading);

    const banner1_image = req.files['banner1_image'] ? req.files['banner1_image'][0].path.replace(/\\/g, "/") : null;
    const banner2_image = req.files['banner2_image'] ? req.files['banner2_image'][0].path.replace(/\\/g, "/") : null;
    const banner3_image = req.files['banner3_image'] ? req.files['banner3_image'][0].path.replace(/\\/g, "/") : null;

    if (!banner1_image || !banner2_image || !banner3_image) {
      return res.status(400).json({
        success: false,
        message: "All banner images are required",
      });
    }

    const newBanner = new bannerModel({
      banner1_image,
      banner1_heading,
      banner2_image,
      banner2_heading,
      banner3_image,
      banner3_heading,
    });

    console.log(banner1_image, banner1_heading, banner2_image, banner2_heading, banner3_image, banner3_heading);

    await newBanner.save();
    return res.status(201).json({
      success: true,
      message: "Home banners added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const editHomeBanner = async (req, res) => {
  try {
    const { banner1_heading, banner2_heading, banner3_heading, bannerId } = req.body;

    if (!bannerId) {
      return res.status(400).json({
        success: false,
        message: "bannerId is required",
      });
    }

    const banner = await bannerModel.findById(bannerId);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
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

    if (banner1_heading) banner.banner1_heading = banner1_heading;
    if (banner2_heading) banner.banner2_heading = banner2_heading;
    if (banner3_heading) banner.banner3_heading = banner3_heading;

    if (req.files['banner1_image']) {
      deleteOldFile(banner.banner1_image);
      banner.banner1_image = req.files['banner1_image'][0].path.replace(/\\/g, "/");
    }
    if (req.files['banner2_image']) {
      deleteOldFile(banner.banner2_image);
      banner.banner2_image = req.files['banner2_image'][0].path.replace(/\\/g, "/");
    }
    if (req.files['banner3_image']) {
      deleteOldFile(banner.banner3_image);
      banner.banner3_image = req.files['banner3_image'][0].path.replace(/\\/g, "/");
    }

    await banner.save();

    return res.status(200).json({
      success: true,
      message: "Home banner updated successfully",
      data: banner,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getHomeBanner = async (req, res) => {
  try {
    const banner = await bannerModel.find({});
    return res.status(200).json({
      success: true,
      message: "Home Banner successfully fetched",
      banner
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export { addHomeBanner, editHomeBanner, getHomeBanner };
