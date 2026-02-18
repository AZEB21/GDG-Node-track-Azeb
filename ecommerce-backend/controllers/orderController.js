const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

exports.createOrder = asyncHandler(async (req, res) => {
  
    const { customerName, customerAddress } = req.body;

    const cartItems = await Cart.find().populate("productId");
    if (cartItems.length === 0) {
      res.status(400);
    throw new Error("Cart is empty");
    }

    let total = 0;
    let orderItems = [];

    for (let item of cartItems) {
      const product = item.productId;

      if (item.quantity > product.stock) {
       res.status(400);
      throw new Error(`Not enough stock for ${product.name}`);
      }

      product.stock -= item.quantity;
      await product.save();

      total += product.price * item.quantity;

      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const order = new Order({
      items: orderItems,
      total,
      customerName,
      customerAddress,
    });

    const savedOrder = await order.save();
    await Cart.deleteMany();

    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });
  } 

);
exports.getOrders =asyncHandler( async (req, res) => {
 
    const orders = await Order.find().populate("items.productId");
    res.json(orders);
  } );

exports.getOrderById = asyncHandler(async (req, res) => {
 
    const order = await Order.findById(req.params.id).populate(
      "items.productId"
    );
    if (!order) { res.status(404);
    throw new Error("Order not found");}
    res.json(order);
  } 
);
