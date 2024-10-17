import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const isAuthenticated = () => {
    return token !== null && token !== undefined;
  };

  const isAdmin = () => {
    return isAuthenticated() && user?.role === "ROLE_ADMIN";
  };

  const isCustomer = () => {
    return isAuthenticated() && user?.role === "ROLE_CUSTOMER";
  };

  const isDeliveryPickupAgent = () => {
    return isAuthenticated() && user?.role === "ROLE_DELIVERY_PICKUP_AGENT";
  };

  const isStaff = () => {
    return isAuthenticated() && user?.role === "ROLE_STAFF";
  };

  const getUser = async (id, role) => {
    const urlMap = {
      ROLE_ADMIN: `/admins/${id}`,
      ROLE_CUSTOMER: `/customers/${id}`,
      ROLE_DELIVERY_PICKUP_AGENT: `/delivery-personnel/${id}`,
      ROLE_STAFF: `/staff/${id}`,
    };

    try {
      const response = await api.get(urlMap[role]);
      const user = response.data;
      const userDetails = {
        ...user,
        id: user?.id,
      };
      console.log(JSON.stringify(user));
      return userDetails;
    } catch (error) {
      console.log(error);
    }
  };

  const setUserDetails = (userDetails) => {
    setUser(userDetails);
  };

  useEffect(() => {
    const onLoad = async () => {
      if (isAuthenticated()) {
        setIsLoading(true);
        const decodedToken = jwtDecode(token || localStorage.getItem("token"));
        const user = await getUser(decodedToken?.id, decodedToken?.role);
        setUser({ ...user, role: decodedToken?.role });
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    onLoad();
    // eslint-disable-next-line
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        updateUser,
        isAuthenticated,
        isAdmin,
        isCustomer,
        isDeliveryPickupAgent,
        isStaff,
        setUser: setUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
