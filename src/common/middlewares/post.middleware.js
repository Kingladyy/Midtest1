import User from "../../modules/user/user.model.js";

export const userPostMiddleware = async (req, res, next) => {
  const apiKey = req.query.apiKey;

  if (!apiKey) {
    return res.status(401).json({ error: "apiKey is required" });
  }

  const user = await User.findOne({ apikey: apiKey });
  if (!user) {
    return res.status(401).json({ error: "Invalid apiKey" });
  }

  req.user = user; 
  next();
};