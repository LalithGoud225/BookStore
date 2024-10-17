import ReturnRequest from "../models/ReturnRequestModel.js";

// Get all return requests
export const getReturnRequests = async (req, res) => {
  try {
    const returnRequests = await ReturnRequest.find();
    res.status(200).json(returnRequests);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get return request by ID
export const getReturnRequestById = async (req, res) => {
  try {
    const returnRequest = await ReturnRequest.findById(req.params.id);
    if (!returnRequest) {
      return res.status(404).json({ message: "Return request not found" });
    }
    res.status(200).json(returnRequest);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new return request
export const addReturnRequest = async (req, res) => {
  const returnRequest = new ReturnRequest(req.body);
  try {
    const newReturnRequest = await returnRequest.save();
    res.status(201).json(newReturnRequest);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Invalid data" });
  }
};

// Update an existing return request
export const updateReturnRequest = async (req, res) => {
  try {
    const returnRequest = await ReturnRequest.findById(req.params.id);
    if (!returnRequest) {
      return res.status(404).json({ message: "Return request not found" });
    }
    returnRequest.set(req.body);
    await returnRequest.save();
    res.status(200).json(returnRequest);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a return request
export const deleteReturnRequest = async (req, res) => {
  try {
    const returnRequest = await ReturnRequest.findById(req.params.id);
    if (!returnRequest) {
      return res.status(404).json({ message: "Return request not found" });
    }
    await returnRequest.remove();
    res.status(200).json({ message: "Return request deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
