const jwt = require("jsonwebtoken");
const BlackListModel = require("../models/blacklist.model");
require("dotenv").config();

const auth = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  try {
    const isAccessTokenPresent = await BlackListModel.findOne({ accessToken });
    if (isAccessTokenPresent || accessToken == undefined)
      throw new Error("Please Login First!");
    else {
      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET_KEY,
        async (err, decoded) => {
          if (err) {
            if (err.message == "jwt expired") {
              jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET_KEY,
                async (err, decoded) => {
                  if (err)
                    throw new Error("Please login again! (from refreshToken)");
                  else {
                    const accessToken = jwt.sign(
                      {
                        userId: decoded.userId,
                        userName: decoded.userName,
                      },
                      process.env.ACCESS_TOKEN_SECRET_KEY
                    );
                    req.body.userId = decoded.userId;
                    req.body.userName = decoded.userName;
                    res.cookie("accessToken", accessToken, {
                      httpOnly: true,
                      secure: true,
                      sameSite: "none",
                    });
                    next();
                  }
                }
              );
            }
          } else {
            req.body.userId = decoded.userId;
            req.body.userName = decoded.userName;
            next();
          }
        }
      );
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = auth;
