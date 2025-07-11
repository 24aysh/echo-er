const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req, res, next) => {
  try {
    const {token} = req.query;
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedData.id;
    next();
  } catch {
    res.status(403).json({ Error : "Invalid JWT" });
  }
}
