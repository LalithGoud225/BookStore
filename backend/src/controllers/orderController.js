import Order from "../models/OrderModel.js";
import OrderPayment from "../models/OrderPaymentModel.js";
import StoreInventory from "../models/StoreInventoryModel.js";

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getOrdersByDeliverPerson = async (req, res) => {
  try {
    const orders = await Order.find({ agent_id: req.params.agentId }).populate(
      "agent_id"
    );
    res.status(200).json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new order
// export const addOrder = async (req, res) => {
//   const order = new Order(req.body.order);
//   try {
//     const newOrder = await order.save();

//     const payment = req.body.paymentDetails;
//     payment.order_id = newOrder._id.toString();

//     const storeInventory = await StoreInventory.findById(
//       req.params.id
//     ).populate("book_id");

//     const orderPayment = new OrderPayment(payment);
//     orderPayment.save();

//     res.status(201).json(newOrder);
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ message: "Invalid data" });
//   }
// };

export const addOrder = async (req, res) => {
  const order = new Order(req.body.order);
  try {
    const newOrder = await order.save();

    // Reduce inventory
    const booksOrdered = req.body.order.books_ordered;
    for (const book of booksOrdered) {
      const inventory = await StoreInventory.findOne({
        store_id: order.store_id,
        book_id: book.book_id,
      });
      if (inventory) {
        inventory.available_copies -= book.quantity;
        await inventory.save();
      }
    }

    const payment = req.body.paymentDetails;
    payment.order_id = newOrder._id.toString();

    const orderPayment = new OrderPayment(payment);
    await orderPayment.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Invalid data" });
  }
};

// Update an existing order
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.set(req.body);
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (req.body.order_status) {
      order.order_status = req.body.order_status;
    }
    if (req.body.agent_id) {
      order.agent_id = req.body.agent_id;
    }

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.remove();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
