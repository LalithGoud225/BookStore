import StoreInventory from "../models/StoreInventoryModel.js";

// Get all store inventory
export const getStoreInventory = async (req, res) => {
  try {
    const storeInventory = await StoreInventory.find().populate("book_id");
    res.status(200).json(storeInventory);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getStoreInventoryByStoreId = async (req, res) => {
  try {
    const storeInventory = await StoreInventory.find({
      store_id: req.params.storeId,
    }).populate("book_id");
    res.status(200).json(storeInventory);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get store inventory by ID
export const getStoreInventoryById = async (req, res) => {
  try {
    const storeInventory = await StoreInventory.findById(
      req.params.id
    ).populate("book_id");

    if (!storeInventory) {
      return res.status(404).json({ message: "Store inventory not found" });
    }
    res.status(200).json(storeInventory);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create new store inventory entry
export const addStoreInventory = async (req, res) => {
  const storeInventory = new StoreInventory(req.body);
  try {
    const newStoreInventory = await storeInventory.save();
    res.status(201).json(newStoreInventory);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Invalid data" });
  }
};

// Update store inventory entry
export const updateStoreInventory = async (req, res) => {
  try {
    const storeInventory = await StoreInventory.findById(req.params.id);
    if (!storeInventory) {
      return res.status(404).json({ message: "Store inventory not found" });
    }
    storeInventory.set(req.body);
    await storeInventory.save();
    res.status(200).json(storeInventory);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete store inventory entry
export const deleteStoreInventory = async (req, res) => {
  try {
    const storeInventory = await StoreInventory.findById(req.params.id);
    if (!storeInventory) {
      return res.status(404).json({ message: "Store inventory not found" });
    }
    await storeInventory.remove();
    res.status(200).json({ message: "Store inventory deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
