import Staff from "../models/StaffModel.js";
import Store from "../models/StoreModel.js";

// Get all stores
export const getStores = async (req, res) => {
  try {
    const stores = await Store.find().populate("staff_id");
    res.status(200).json(stores);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get store by ID
export const getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id).populate("staff_id");
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }
    res.status(200).json(store);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new store
export const addStore = async (req, res) => {
  const store = new Store(req.body);
  try {
    const newStore = await store.save();

    const staff_id = req.body.staff_id;
    const staff = await Staff.findById(staff_id);
    staff.store_id = newStore._id.toString();
    await staff.save();

    res.status(201).json(newStore);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Invalid data" });
  }
};

// Update an existing store
export const updateStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const staff_id = req.body.staff_id;
    const staff = await Staff.findById(staff_id);
    staff.store_id = store._id.toString();
    await staff.save();

    store.set(req.body);
    await store.save();
    res.status(200).json(store);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a store
export const deleteStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }
    await store.remove();
    res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
