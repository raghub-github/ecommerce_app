require('dotenv').config();
const connectToMongo = require("./db");
const product = require('./models/products');
const productJSON = require('./products.json');

const start = async () => {
    try {
        await connectToMongo();
        // const existingData = db.users.findMany({ name: productJSON.name });
        // if (existingData) {
        //   console.log("Data with this name already exists");
        // } else {
        //   db.product.insertOne(productJSON);
        //   console.log("Data inserted successfully");
        // }
        await product.deleteMany();
        await product.create(productJSON);
        console.log("db created successfully");
    } catch (error) {
        console.log(error.message);
    }
}

start();
