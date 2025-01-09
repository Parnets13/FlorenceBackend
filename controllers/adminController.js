import adminModel from "../model/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminRegister = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  try {
    const isEmail = await adminModel.findOne({ email });
    if (isEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }
    const isMobileExist = await adminModel.findOne({ mobile });
    if (isMobileExist) {
      return res.status(409).json({
        success: false,
        message: "Mobile already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new adminModel({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    await newAdmin.save();

    return res.status(200).json({
      success: true,
      message: "Admin regisered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Email not registered ",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id },
      "Florence#random@secret"
    );

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export { adminLogin, adminRegister };
