var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

const fetchuser = (req, res, next) => {
  // get the user from jwt token and id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // // You can also specify other CORS headers as needed
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};
module.exports = fetchuser;
