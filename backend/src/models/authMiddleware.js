import jwt from "jsonwebtoken";
import Admin from "../models/AdminModel.js";
import Customer from "../models/CustomerModel.js";

export const authorize =
  (roles = []) =>
  async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send("Authorization header missing");
    }
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      let user = null;
      if (roles.includes("ROLE_CUSTOMER")) {
        user = await Customer.findById(decoded.user_id);
      } else if (roles.includes("ROLE_ADMIN")) {
        user = await Admin.findById(decoded.user_id);
      }
      if (!user) {
        return res.status(403).send("Forbidden");
      }

      req.userId = decoded.userId;

      next();
    } catch (err) {
      console.log(err);
      res.status(401).send("Invalid token");
    }
  };
