import DeliveryPersonnel from "../models/DeliveryPersonnelModel.js";
import { generateToken } from "./util.js";

// Get all delivery personnel
export const getDeliveryPersonnel = async (req, res) => {
  try {
    const deliveryPersonnel = await DeliveryPersonnel.find();
    res.status(200).json(deliveryPersonnel);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get delivery personnel by ID
export const getDeliveryPersonnelById = async (req, res) => {
  try {
    const deliveryPersonnel = await DeliveryPersonnel.findById(req.params.id);
    if (!deliveryPersonnel) {
      return res.status(404).json({ message: "Delivery personnel not found" });
    }
    res.status(200).json(deliveryPersonnel);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new delivery personnel
export const addDeliveryPersonnel = async (req, res) => {
  const deliveryPersonnel = new DeliveryPersonnel(req.body);
  try {
    const newDeliveryPersonnel = await deliveryPersonnel.save();
    res.status(201).json(newDeliveryPersonnel);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Invalid data" });
  }
};

// Update an existing delivery personnel
export const updateDeliveryPersonnel = async (req, res) => {
  try {
    const deliveryPersonnel = await DeliveryPersonnel.findById(req.params.id);
    if (!deliveryPersonnel) {
      return res.status(404).json({ message: "Delivery personnel not found" });
    }
    deliveryPersonnel.set(req.body);
    await deliveryPersonnel.save();
    res.status(200).json(deliveryPersonnel);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a delivery personnel
export const deleteDeliveryPersonnel = async (req, res) => {
  try {
    const deliveryPersonnel = await DeliveryPersonnel.findById(req.params.id);
    if (!deliveryPersonnel) {
      return res.status(404).json({ message: "Delivery personnel not found" });
    }
    await deliveryPersonnel.remove();
    res
      .status(200)
      .json({ message: "Delivery personnel deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delivery personnel login
export const deliveryPersonnelLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const deliveryPersonnel = await DeliveryPersonnel.findOne({ email });

    if (!deliveryPersonnel) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await deliveryPersonnel.checkPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      user_id: deliveryPersonnel._id,
      id: deliveryPersonnel._id,
      role: "ROLE_DELIVERY_PICKUP_AGENT",
      email: deliveryPersonnel.email,
    });

    res.json({
      token,
      ...deliveryPersonnel.toJSON({ virtuals: true }),
      id: deliveryPersonnel._id,
      role: "ROLE_DELIVERY_PICKUP_AGENT",
      email: deliveryPersonnel.email,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
