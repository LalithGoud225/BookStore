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
  updateStaffStatus,
  updateStaffPassword,
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
  getStoreInventoryByStoreId,
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
  customerLogin,
} from "../controllers/customerController.js";
import {
  getOrders,
  getOrderById,
  addOrder,
  updateOrder,
  updateOrderStatus,
  getOrdersByDeliverPerson,
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
  deliveryPersonnelLogin,
} from "../controllers/deliveryPersonnelController.js";

const router = express.Router();

// Admin routes
router.get("/admins", getAdmins);
router.post("/admins", addAdmin);
router.get("/admins/:id", getAdminById);
router.put("/admins/:id", updateAdmin);
router.post("/admins/login", adminLogin);

// Staff routes
router.get("/staff", getStaff);
router.post("/staff", addStaff);
router.get("/staff/:id", getStaffById);
router.put("/staff/:id", updateStaff);
router.put("/staff/:id/change-password", updateStaffPassword);
router.put("/staff/:id/status", updateStaffStatus);
router.post("/staff/login", staffLogin);

// Book routes
router.get("/books", getBooks);
router.post("/books", addBook);
router.get("/books/:id", getBookById);
router.put("/books/:id", updateBook);

// Store Inventory routes
router.get("/store-inventory", getStoreInventory);
router.get("/store-inventory/store/:storeId", getStoreInventoryByStoreId);
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
router.post("/customers/login", customerLogin);

// Order routes
router.get("/orders", getOrders);
router.get("/orders/delivery-personnel/:agentId", getOrdersByDeliverPerson);
router.post("/orders", addOrder);
router.get("/orders/:id", getOrderById);
router.put("/orders/:id", updateOrder);
router.put("/orders/:id/status", updateOrderStatus);

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
router.post("/delivery-personnel/login", deliveryPersonnelLogin);

export default router;
