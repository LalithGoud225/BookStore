import React from "react";
import { Link } from "react-router-dom";
import { Menu, Sidebar } from "semantic-ui-react";
import { useAuth } from "../../contexts/AuthContext";
import { primaryObj } from "../../utils/colors";

const CustomMenuItem = ({ children, to }) => (
  <Link to={to} style={{ color: "inherit", textDecoration: "none" }}>
    <div style={{ padding: 14, fontSize: 14, border: "1px solid lightgray" }}>
      {children}
    </div>
  </Link>
);

const LeftSidebar = () => {
  const { isAdmin, isAuthenticated, isManager, isCustomer } = useAuth();

  return (
    <div style={{ top: "50px" }}>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        vertical
        visible={true}
        width="thin"
        style={{
          position: "fixed",
          bottom: 0,
          top: "60px",
          height: "calc(100vh - 60px)",
          color: "black",
          width: "10%",
          backgroundColor: "#e5f2ff",
        }}
      >
        <div style={{ marginTop: 0 }}>
          {isManager() && (
            <>
              <CustomMenuItem to="/manager/dashboard">Dashboard</CustomMenuItem>
              <CustomMenuItem to="/manager/reports">Reports</CustomMenuItem>
            </>
          )}
          {isCustomer() && (
            <>
              <CustomMenuItem to="/customer/dashboard">
                Dashboard
              </CustomMenuItem>
              <CustomMenuItem to="/customer/profile">Profile</CustomMenuItem>
              <CustomMenuItem to="/customer/orders">Orders</CustomMenuItem>
            </>
          )}
          {isAdmin() && (
            <>
              <CustomMenuItem to="/admin/dashboard">Dashboard</CustomMenuItem>
              <CustomMenuItem to="/admin/users">Users</CustomMenuItem>
              <CustomMenuItem to="/admin/products">Products</CustomMenuItem>
            </>
          )}
        </div>
      </Sidebar>
    </div>
  );
};

export default LeftSidebar;
