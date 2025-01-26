import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { v2 as cloudinary } from "cloudinary";
import { options } from "../constants/config.js";

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.cookie("jwt_token", token, options);
  return res.status(code).json({
    success: true,
    message,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

const uploadToCloud = async (file) => {
  try {
    const data = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
    });
    return {
      url: data.url,
      public_id: data.public_id,
    };
  } catch (err) {
    throw new Error("Failed to Upload" + err.message);
  }
};

const transpoter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendMail = async (to, sub, msg) => {
  try {
    const info = await transpoter.sendMail({
      from: process.env.USER_EMAIL,
      to,
      subject: sub,
      html: `<div>${msg}</div>`,
    });
    console.log(info);
  } catch (err) {
    throw new Error(err.message);
  }
};

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000)
};

export { sendToken, uploadToCloud, sendMail, generateOtp };
