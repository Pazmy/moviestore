const jwt = require("jsonwebtoken");

function generateAccessToken(email) {
  return jwt.sign(email, "dummysecret");
}
// { expiresIn: "3600s" }

module.exports = { generateAccessToken };
