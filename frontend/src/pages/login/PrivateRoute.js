import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const adminUrls = [
  "/admin/dashboard",
  "/admin/branches",
  "/admin/branches/create",
  "/admin/branches/:id/edit",
  "/admin/branch-managers",
  "/admin/branch-managers/create",
  "/admin/branch-managers/:id/edit",
];
const branchManagerUrls = [
  "/branch-manager/dashboard",
  "/branch-manager/staff-list",
  "/branch-manager/staff-list/create",
  "/branch-manager/staff-list/:id/edit",
  "/branch-manager/parcels",
  "/branch-manager/parcels/:id/view",
  "/branch-manager/parcels/create",
  "/branch-manager/parcels/:id/edit",
  "/track-parcel",
];
const staffUrls = ["/staff/parcels", "/staff/parcels/:id/edit"];

const customerUrls = [
  "/customer/dashboard",
  "/customer/new-delivery",
  "/customer/parcels",
  "/customer/parcels/:id/pay-appointment-fee",
  "/customer/parcels/:id/pay-parcel-fee",
];

function PrivateRoute({ path, element: Component }) {
  const {
    isAuthenticated,
    isAdmin,
    isEmployee,
    isBranchManager,
    isSupervisor,
  } = useAuth();

  let hasAccess = false;
  if (adminUrls.includes(path)) {
    hasAccess = isAuthenticated() && isAdmin();
  } else if (branchManagerUrls.includes(path)) {
    hasAccess = isAuthenticated() && isBranchManager();
  } else if (staffUrls.includes(path)) {
    hasAccess = isAuthenticated() && isSupervisor();
  } else if (customerUrls.includes(path)) {
    hasAccess = isAuthenticated() && isEmployee();
  }
  return <>{hasAccess ? <Component /> : <Navigate to="/access-denied" />}</>;
}

export default PrivateRoute;
