const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");


exports.getAllProducts = asyncHandler(async (req, res) => {
  
    const { category, minPrice, maxPrice } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };

    const products = await Product.find(filter);
    res.json(products);
  } );

exports.getProductById = asyncHandler(async (req, res) => {
  
    const product = await Product.findById(req.params.id);
    if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
    res.json(product);
  } );

exports.createProduct =asyncHandler( async (req, res) => {
  
    const { name, description, price, stock, category, imageUrl } = req.body;

    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      imageUrl,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } );

exports.updateProduct =asyncHandler( async (req, res) => {
 
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {res.status(404);
    throw new Error("Product not found");}
    res.json(updatedProduct);
  } );

exports.deleteProduct =asyncHandler( async (req, res) => {

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
    res.status(404);
    throw new Error("Product not found");
  }
    res.json({ message: "Product deleted successfully" });
  });
