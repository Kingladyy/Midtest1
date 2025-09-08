import User from "../../modules/user/user.model.js";

export const userPostMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : undefined;
  const apiKey = (req.headers["x-api-key"] || req.query.apiKey || req.body?.apiKey || bearerToken)?.toString().trim();

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