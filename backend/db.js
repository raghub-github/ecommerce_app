require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://raghudata:Raghu123B@ecomapi.8joj0yf.mongodb.net/ecomapi?retryWrites=true&w=majority";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log(process.env.mongoURI);
    console.log("Connected to MongoDB Successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToMongo;
