import Staff from "../models/StaffModel.js";

import { generateToken } from "./util.js";

// Get all staff members
export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find().populate("store_id");
    res.status(200).json(staff);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get staff member by ID
export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).populate("store_id");
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    res.status(200).json(staff);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new staff member
export const addStaff = async (req, res) => {
  const staff = new Staff(req.body);
  try {
    const newStaff = await staff.save();
    res.status(201).json(newStaff);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Invalid data" });
  }
};

// Update an existing staff member
export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    staff.set(req.body);
    await staff.save();
    res.status(200).json(staff);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateStaffStatus = async (req, res) => {
  try {
    const status = req.body.status;

    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    staff.status = status;

    await staff.save();
    res.status(200).json(staff);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateStaffPassword = async (req, res) => {
  try {
    const password = req.body.password;

    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    staff.password = password;
    staff.is_password_changed = "yes";

    await staff.save();
    res.status(200).json(staff);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Staff login
export const staffLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const staff = await Staff.findOne({ email });

    if (!staff) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await staff.checkPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      user_id: staff._id,
      id: staff._id,
      role: "ROLE_STAFF",
      email: staff.email,
    });

    res.json({
      token,
      ...staff.toJSON({ virtuals: true }),
      id: staff._id,
      role: "ROLE_STAFF",
      email: staff.email,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
