import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { useAuth } from "../../contexts/AuthContext";
import { primaryObj } from "../../utils/colors";

const CustomMenuItem = ({ children, to }) => (
  <Link to={to} style={{ color: "inherit", textDecoration: "none" }}>
    <div
      style={{
        padding: 10,
        fontSize: 16,
      }}
    >
      {children}
    </div>
  </Link>
);

const Header = () => {
  const {
    isAuthenticated,
    isAdmin,
    isCustomer,
    isDeliveryPickupAgent,
    isStaff,
    user,
  } = useAuth();
  const navigate = useNavigate();

  return (
    <Menu fixed="top" inverted style={{ ...primaryObj }}>
      <div
        onClick={() => navigate("/")}
        header
        style={{
          padding: 3,
          marginRight: "auto",
          marginLeft: 140,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          height: 80,
        }}
      >
        <div
          style={{
            padding: 20,
            cursor: "pointer", // Change cursor on hover
          }}
        >
          <b style={{ fontSize: 25 }}>
            <strong>Book Store</strong>
          </b>
        </div>
      </div>
      {isStaff() && (
        <div
          style={{
            padding: 3,
            marginRight: "auto",
            marginLeft: 140,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            height: 80,
          }}
        >
          Store Details: {`${user?.store_id?.name}, ${user.store_id?.location}`}
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: 250,
          fontSize: 14,
        }}
      >
        {isAuthenticated() && (
          <>
            {isAdmin() && (
              <>
                <CustomMenuItem to="/admin/stores">Stores</CustomMenuItem>
                <CustomMenuItem to="/admin/staff">Staff</CustomMenuItem>
              </>
            )}

            {isCustomer() && (
              <>
                <CustomMenuItem to="/books">Books</CustomMenuItem>
                <CustomMenuItem to="/customer/order-books">
                  Order{" "}
                </CustomMenuItem>
                <CustomMenuItem to="/customer/orders">
                  List of Orders
                </CustomMenuItem>
              </>
            )}

            {isDeliveryPickupAgent() && (
              <>
                <CustomMenuItem to="/delivery-person/orders">
                  Orders
                </CustomMenuItem>
                {/* <CustomMenuItem to="/delivery-person/returns">
                  Returns
                </CustomMenuItem> */}
              </>
            )}

            {isStaff() && (
              <>
                <CustomMenuItem to="/staff/books">Books</CustomMenuItem>
                <CustomMenuItem to="/staff/inventory">Inventory</CustomMenuItem>
                <CustomMenuItem to="/staff/orders">Orders</CustomMenuItem>
                <CustomMenuItem to="/staff/delivery-persons">
                  Delivery Persons
                </CustomMenuItem>
              </>
            )}

            <CustomMenuItem to="/logout">Logout</CustomMenuItem>
          </>
        )}
        {!isAuthenticated() && (
          <>
            <CustomMenuItem as={Link} to="/books">
              Books
            </CustomMenuItem>
            <CustomMenuItem as={Link} to="/login">
              Login
            </CustomMenuItem>
            <CustomMenuItem as={Link} to="/register">
              Register
            </CustomMenuItem>
          </>
        )}
      </div>
    </Menu>
  );
};

export default Header;
