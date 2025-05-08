import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken"

// create a new access token for the user with the given payload and secret key and return the token
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) console.log(err);
        resolve(token);
      }
    );
  });
}
