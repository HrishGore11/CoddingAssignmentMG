const jwt = require("jsonwebtoken");
const jwt_key = "sdfghjkla@$%&";
const User = require("../models/user");
const auth_user = (req, res, next) => {
  const token = req.header("AUTHORIZATION");
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "please Authenticate with Valid Token",
    });
  }
  //   try {
  //     const data1 = jwt.verify(token, jwt_key);
  //     req.user = data1.user;
  //     next();
  //   } catch (error) {
  //     return res.status(401).json({
  //       success: false,
  //       message: "please Authenticate with Valid Token",
  //     });
  //   }
  jwt.verify(token, jwt_key, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "u must logged in" });
    }
    // console.log(payload);
    const { id } = payload.user;
    User.findById(id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};

module.exports = auth_user;
