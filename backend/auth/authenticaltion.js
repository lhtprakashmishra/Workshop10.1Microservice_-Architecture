import { body } from "express-validator";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

function isValidMobileNumber(mobileNumber) {
  const mobileStr = String(mobileNumber);

  return mobileStr.length === 10;
}
function isValidPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return passwordRegex.test(password);
}

export const validationRules = () => {
  return [
    body("name").notEmpty().withMessage("Name is Required"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("mobile").custom((value) => {
      if (!isValidMobileNumber(value)) {
        throw new Error("Invalid Mobile Number");
      }
      return true;
    }),
    body("password").custom((value) => {
      if (!isValidPassword(value)) {
        throw new Error(
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
      }
      return true;
    }),
  ];
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Store the decoded user data
    console.log("Token Verified");
    next();
  } catch (err) {
    console.error(err); // Log the error for debugging
    if (err.name === "TokenExpiredError") {
      // Token expired specific error
      return res
        .status(401)
        .json({ message: "Token expired. Please log in again." });
    }
    res.status(400).json({ message: "Invalid token." });
  }
};
