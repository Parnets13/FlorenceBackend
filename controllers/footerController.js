import footerModel from "../model/footerModel.js";

const addFooter = async (req, res) => {
  const { address, tel, mobile, email, facebook, instagram, twitter, google } =
    req.body;
  try {
    const newFooter = new footerModel({
      address,
      tel,
      mobile,
      email,
      facebook,
      instagram,
      twitter,
      google,
    });

    await newFooter.save();

    return res.status(201).json({
      success: true,
      message: "Footer added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const editFooter = async(req, res) => {
  const {
    address,
    tel,
    mobile,
    email,
    facebook,
    instagram,
    twitter,
    google,
    id,
  } = req.body;
  try {
    const updatedFooter = await footerModel.findByIdAndUpdate(
      { _id: id },
      {
        address,
        tel,
        mobile,
        email,
        facebook,
        instagram,
        twitter,
        google,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Footer updated successfully",
      data: updatedFooter,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const getFooter  = async(req,res) =>{
   const footer = await footerModel.find({});
   try {
    return res.status(200).json({
        success:true,
        message:"Footer details fetched successfully",
        footer
     })
   } catch (error) {
      console.error(error)
      return res.status(500).json({
        success:false,
        message:"Something went wrong"
      })
   }
}

export { addFooter, editFooter ,getFooter};
