const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");


exports.getCart = asyncHandler(async (req, res) => {
  
    const cartItems = await Cart.find().populate("productId");
    res.json(cartItems);
  } );

exports.addToCart =asyncHandler( async (req, res) => {
  
    const { productId, quantity } = req.body;

    if (!quantity || quantity <= 0) {
    res.status(400);
    throw new Error("Quantity must be greater than 0");    }

    const product = await Product.findById(productId);
    if (!product){
 res.status(404);
    throw new Error("Product not found");}
    let cartItem = await Cart.findOne({ productId });

    if (cartItem) {
      if (cartItem.quantity + quantity > product.stock) {
      res.status(400);
      throw new Error("Not enough stock");
    }
      cartItem.quantity += quantity;
    } else {
      if (quantity > product.stock) {
 res.status(400);
      throw new Error("Not enough stock");      }

      cartItem = new Cart({ productId, quantity });
    }

    const savedItem = await cartItem.save();
    res.status(201).json(savedItem);

  } );


exports.updateCartItem = asyncHandler(async (req, res) => {
  
    const { quantity } = req.body;
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) {res.status(404);
    throw new Error("Cart item not found");}

    const product = await Product.findById(cartItem.productId);
    if (quantity > product.stock)
{
    res.status(400);
    throw new Error("Not enough stock");
  }
    cartItem.quantity = quantity;
    const updatedItem = await cartItem.save();
    res.json(updatedItem);
  } );

exports.removeCartItem =asyncHandler( async (req, res) => {
  
    const deletedItem = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
    res.status(404);
    throw new Error("Cart item not found");
  }
    res.json({ message: "Cart item removed" });
  } 
);
