import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import { useAuth } from "../../contexts/AuthContext.js";

const layoutStyle = {
  display: "flex",
  flexDirection: "column", // Stack items vertically
  minHeight: "100vh", // Make sure the layout covers the full height of the viewport
  marginTop: "50px", // Adjust the top margin based on your header's height,
  backgroundColor: "#e6f2ff",
};

const contentStyle = {
  flex: 1,
  marginTop: 30, // Adjust the top margin based on your header's height,
  marginLeft: 128,
  backgroundColor: "#e6f2ff",
};

const contentStyleWithoutSidebar = {
  ...contentStyle,
  marginLeft: 0,
  backgroundColor: "#e6f2ff",
};

const hideSidebarUrls = [
  "/",
  "/admin/login",
  "/seller/login",
  "/buyer/login",
  "/agent/login",
  "/properties",
  "/properties-search",
];

const paddingDesignStyle = {
  marginTop: "1em",
  paddingLeft: "100px",
  paddingRight: "100px",
};

const paddingDesign = [
  "/",
  "/login",
  "/user/login",
  "/admin/login",
  "/register",
  "/home",
  "/",
  "/apartments",
];

const Layout = ({ children }) => {
  const location = useLocation(); // Get the current location
  const { isAdmin, isAuthenticated } = useAuth();

  const paddingStyle = paddingDesign.includes(location.pathname)
    ? {}
    : paddingDesignStyle;

  const style = { ...contentStyleWithoutSidebar, ...paddingStyle };

  return (
    <div style={layoutStyle}>
      <Header />
      <div style={style}>{children}</div>
    </div>
  );
};

export default Layout;
