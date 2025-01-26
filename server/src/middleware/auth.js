import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_token;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "user not logged in",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid token",
        });
      }
      // console.log(data);
      req._id = data._id;

    });
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export { protectRoute };
