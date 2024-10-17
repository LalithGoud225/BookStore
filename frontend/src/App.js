import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminStaffList from "./pages/admin/AdminStaffList";
import AdminStoreList from "./pages/admin/AdminStoreList";
import CreateStaff from "./pages/admin/CreateStaff";
import CreateStore from "./pages/admin/CreateStore";
import EditStaff from "./pages/admin/EditStaff";
import EditStore from "./pages/admin/EditStore";
import CustomerOrderDetails from "./pages/customer/CustomerOrderDetails";
import CustomerOrderList from "./pages/customer/CustomerOrderList";
import DeliveryDetails from "./pages/delivery-person/DeliveryDetails";
import DeliveryPersonLogin from "./pages/delivery-person/DeliveryPersonLogin";
import DeliveryPersonOrderList from "./pages/delivery-person/DeliveryPersonOrderList";
import BookInventoryDetails from "./pages/home/BookInventoryDetails";
import BookList from "./pages/home/BookList";
import Homepage from "./pages/home/HomePage";
import OrderSummary from "./pages/home/OrderSummary";
import PaymentDetails from "./pages/home/PaymentDetails";
import Layout from "./pages/layout/Layout";
import AccessDenied from "./pages/login/AccessDenied";
import CustomerRegister from "./pages/login/CustomerRegister";
import Login from "./pages/login/Login";
import Logout from "./pages/login/Logout";
import NotFound from "./pages/login/NotFound";
import CreateBook from "./pages/staff/CreateBook";
import CreateDeliveryPerson from "./pages/staff/CreateDeliveryPerson";
import CreateInventory from "./pages/staff/CreateInventory";
import EditBook from "./pages/staff/EditBook";
import EditDeliveryPerson from "./pages/staff/EditDeliveryPerson";
import StaffBookList from "./pages/staff/StaffBookList";
import StaffDeliveryPersonList from "./pages/staff/StaffDeliveryPersonList";
import StaffLogin from "./pages/staff/StaffLogin";
import StaffOrderDetails from "./pages/staff/StaffOrderDetails";
import StaffOrderList from "./pages/staff/StaffOrderList";
import StoreInventoryList from "./pages/staff/StoreInventoryList";
import UpdateInventory from "./pages/staff/UpdateInventory";
import ReturnRequests from "./pages/staff/ReturnRequests";
import StaffChangePassword from "./pages/staff/StaffChangePassword";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<CustomerRegister />} />
            <Route exact path="/home" element={<Homepage />} />
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/access-denied" element={<AccessDenied />} />
            <Route exact path="*" element={<NotFound />} />
            <Route exact path="/customer/login" element={<Homepage />} />
            <Route exact path="/books" element={<BookList />} />
            <Route exact path="/books/:id" element={<BookInventoryDetails />} />

            {/* Admin URLS */}
            <Route exact path="/admin/login" element={<AdminLogin />} />
            <Route exact path="/admin/staff" element={<AdminStaffList />} />
            <Route exact path="/admin/staff/create" element={<CreateStaff />} />
            <Route exact path="/admin/staff/:id/edit" element={<EditStaff />} />
            <Route exact path="/admin/stores" element={<AdminStoreList />} />
            <Route
              exact
              path="/admin/stores/create"
              element={<CreateStore />}
            />
            <Route
              exact
              path="/admin/stores/:id/edit"
              element={<EditStore />}
            />
            {/* Staff urls */}
            <Route exact path="/staff/login" element={<StaffLogin />} />
            <Route exact path="/staff/books" element={<StaffBookList />} />
            <Route exact path="/staff/books/create" element={<CreateBook />} />
            <Route
              exact
              path="/staff/books/:bookId/edit"
              element={<EditBook />}
            />
            <Route
              exact
              path="/staff/inventory"
              element={<StoreInventoryList />}
            />
            <Route
              exact
              path="/staff/inventory/create"
              element={<CreateInventory />}
            />
            <Route
              exact
              path="/staff/inventory/:id/edit"
              element={<UpdateInventory />}
            />
            <Route
              exact
              path="/staff/delivery-persons"
              element={<StaffDeliveryPersonList />}
            />
            <Route
              exact
              path="/staff/delivery-persons/create"
              element={<CreateDeliveryPerson />}
            />
            <Route
              exact
              path="/staff/delivery-persons/:id/edit"
              element={<EditDeliveryPerson />}
            />
            <Route exact path="/staff/orders" element={<StaffOrderList />} />
            <Route
              exact
              path="/staff/orders/:orderId"
              element={<StaffOrderDetails />}
            />

            <Route
              exact
              path="/staff/return-requests"
              element={<ReturnRequests />}
            />

            <Route
              exact
              path="/staff/change-password"
              element={<StaffChangePassword />}
            />

            {/* Customer URLs */}
            <Route
              exact
              path="/customer/order-books"
              element={<OrderSummary />}
            />
            <Route
              exact
              path="/customer/order-books/payment"
              element={<PaymentDetails />}
            />
            <Route
              exact
              path="/customer/orders"
              element={<CustomerOrderList />}
            />
            <Route
              exact
              path="/customer/orders/:orderId"
              element={<CustomerOrderDetails />}
            />

            {/* Delivery person login */}
            <Route
              exact
              path="/delivery-person/login"
              element={<DeliveryPersonLogin />}
            />
            <Route
              exact
              path="/delivery-person/orders"
              element={<DeliveryPersonOrderList />}
            />
            <Route
              exact
              path="/delivery-person/orders/:orderId"
              element={<DeliveryDetails />}
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
