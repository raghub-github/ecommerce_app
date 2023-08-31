const Product = require('../models/products');

const getAllProducts = async (req, res) => {
    const { company, name, featured, sort, select, _id } = req.query;
    const queryObject = {};
    if (company) {
        queryObject.company = { $regex: company, $options: "i" };
    }
    if (_id) {
        queryObject._id = _id;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }
    if (featured) {
        queryObject.featured = featured;
    }
    let apiData = Product.find(queryObject);
    if (sort) {
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }
    if (select) {
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 12;
    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit);

    const products = await apiData;
    res.status(200).json({ products, nbHits: products.length });
};


module.exports = { getAllProducts };