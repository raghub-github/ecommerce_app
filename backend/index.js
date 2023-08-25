require("dotenv").config();
const connectToMongo = require("./db");
const express = require("express");
const app = express();
const port = process.env.REACT_APP_HOST || 5000;
var cors = require("cors");

connectToMongo();
app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/carts", require("./routes/carts"));
app.use("/api/products", require("./routes/carts"));

app.listen(port, () => {
  console.log(`eComApp backend listening on port http://localhost:${port}`);
});
