import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

// middleware function to verify the user's authentication token, if the token is valid then set the user object in the request object and proceed to the next middleware function
const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  
  if (!token)
    return res.status(401).json(["Not found"]);

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json(["Not found"]);

    req.user = user
    
    next();
  });
};

export default authRequired;