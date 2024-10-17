import OrderPayment from "../models/OrderPaymentModel.js";

// Get all order payments
export const getOrderPayments = async (req, res) => {
  try {
    const orderPayments = await OrderPayment.find();
    res.status(200).json(orderPayments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get order payment by ID
export const getOrderPaymentById = async (req, res) => {
  try {
    const orderPayment = await OrderPayment.findById(req.params.id);
    if (!orderPayment) {
      return res.status(404).json({ message: "Order payment not found" });
    }
    res.status(200).json(orderPayment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new order payment
export const addOrderPayment = async (req, res) => {
  const orderPayment = new OrderPayment(req.body);
  try {
    const newOrderPayment = await orderPayment.save();
    res.status(201).json(newOrderPayment);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Invalid data" });
  }
};

// Update an existing order payment
export const updateOrderPayment = async (req, res) => {
  try {
    const orderPayment = await OrderPayment.findById(req.params.id);
    if (!orderPayment) {
      return res.status(404).json({ message: "Order payment not found" });
    }
    orderPayment.set(req.body);
    await orderPayment.save();
    res.status(200).json(orderPayment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete an order payment
export const deleteOrderPayment = async (req, res) => {
  try {
    const orderPayment = await OrderPayment.findById(req.params.id);
    if (!orderPayment) {
      return res.status(404).json({ message: "Order payment not found" });
    }
    await orderPayment.remove();
    res.status(200).json({ message: "Order payment deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
