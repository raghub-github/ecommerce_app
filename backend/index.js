const connectToMongo = require("./db");
const express = require("express");
const app = express();
const port = process.env.REACT_APP_HOST || 5000;
var cors = require("cors");

connectToMongo();
app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNoutebook backend listening on port http://localhost:${port}`);
});
