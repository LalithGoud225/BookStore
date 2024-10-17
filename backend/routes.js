import express from "express";
import {
  getAdmins,
  getAdminById,
  addAdmin,
  updateAdmin,
  adminLogin,
} from "../controllers/adminController.js";
import {
  getStaff,
  getStaffById,
  addStaff,
  updateStaff,
  staffLogin,
} from "../controllers/staffController.js";
import {
  getBooks,
  getBookById,
  addBook,
  updateBook,
} from "../controllers/bookController.js";
import {
  getStoreInventory,
  getStoreInventoryById,
  addStoreInventory,
  updateStoreInventory,
} from "../controllers/storeInventoryController.js";
import {
  getStores,
  getStoreById,
  addStore,
  updateStore,
} from "../controllers/storeController.js";
import {
  getCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
} from "../controllers/customerController.js";
import {
  getOrders,
  getOrderById,
  addOrder,
  updateOrder,
} from "../controllers/orderController.js";
import {
  getReturnRequests,
  getReturnRequestById,
  addReturnRequest,
  updateReturnRequest,
} from "../controllers/returnRequestController.js";
import {
  getOrderPayments,
  getOrderPaymentById,
  addOrderPayment,
  updateOrderPayment,
} from "../controllers/orderPaymentController.js";
import {
  getDeliveryPersonnel,
  getDeliveryPersonnelById,
  addDeliveryPersonnel,
  updateDeliveryPersonnel,
} from "../controllers/deliveryPersonnelController.js";

import { authorize } from "../models/authMiddleware.js";

const router = express.Router();

// Admin routes
router.get("/admins", authorize(["ROLE_ADMIN"]), getAdmins);
router.post("/admins", authorize(["ROLE_ADMIN"]), addAdmin);
router.get("/admins/:id", authorize(["ROLE_ADMIN"]), getAdminById);
router.put("/admins/:id", authorize(["ROLE_ADMIN"]), updateAdmin);
router.post("/admins/login", adminLogin);

// Staff routes
router.get("/staff", getStaff);
router.post("/staff", addStaff);
router.get("/staff/:id", getStaffById);
router.put("/staff/:id", updateStaff);
router.post("/staff/login", staffLogin);

// Book routes
router.get("/books", getBooks);
router.post("/books", addBook);
router.get("/books/:id", getBookById);
router.put("/books/:id", updateBook);

// Store Inventory routes
router.get("/store-inventory", getStoreInventory);
router.post("/store-inventory", addStoreInventory);
router.get("/store-inventory/:id", getStoreInventoryById);
router.put("/store-inventory/:id", updateStoreInventory);

// Store routes
router.get("/stores", getStores);
router.post("/stores", addStore);
router.get("/stores/:id", getStoreById);
router.put("/stores/:id", updateStore);

// Customer routes
router.get("/customers", getCustomers);
router.post("/customers", addCustomer);
router.get("/customers/:id", getCustomerById);
router.put("/customers/:id", updateCustomer);

// Order routes
router.get("/orders", getOrders);
router.post("/orders", addOrder);
router.get("/orders/:id", getOrderById);
router.put("/orders/:id", updateOrder);

// Return Request routes
router.get("/return-requests", getReturnRequests);
router.post("/return-requests", addReturnRequest);
router.get("/return-requests/:id", getReturnRequestById);
router.put("/return-requests/:id", updateReturnRequest);

// Order Payment routes
router.get("/order-payments", getOrderPayments);
router.post("/order-payments", addOrderPayment);
router.get("/order-payments/:id", getOrderPaymentById);
router.put("/order-payments/:id", updateOrderPayment);

// Delivery Personnel routes
router.get("/delivery-personnel", getDeliveryPersonnel);
router.post("/delivery-personnel", addDeliveryPersonnel);
router.get("/delivery-personnel/:id", getDeliveryPersonnelById);
router.put("/delivery-personnel/:id", updateDeliveryPersonnel);

export default router;
