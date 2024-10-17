import React, { useState } from "react";
import { Button, Form, Grid, Header, Message } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { primaryObj } from "../../utils/colors";

const CustomerRegister = () => {
  const [customer, setCustomer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    address: "",
    phone: "",
    state: "",
    city: "",
    zipcode: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async () => {
    setErrors({});
    setSuccessMessage("");

    // Validation rules
    const validationRules = {
      first_name: "First name is required",
      last_name: "Last name is required",
      email: "Email address is required",
      password: "Password is required",
      confirm_password:
        "Confirm password is required and must match the password",
      address: "Address is required",
      phone: "Phone number is required",
      state: "State is required",
      city: "City is required",
      zipcode: "Zip code is required",
      dob: "Date of Birth is required",
    };

    let formIsValid = true;
    let finalErrors = {};

    // Check for empty fields
    for (const key in customer) {
      if (!customer[key]) {
        finalErrors = { ...finalErrors, [key]: validationRules[key] };
        formIsValid = false;
      }
    }

    // Check if passwords match
    if (customer.password !== customer.confirm_password) {
      finalErrors.confirm_password = validationRules.confirm_password;
      formIsValid = false;
    }

    // Update errors state
    if (!formIsValid) {
      setErrors(finalErrors);
      return;
    }

    try {
      // Make API call to register customer
      await api.post("/customers", customer);
      // Redirect to login page after successful registration
      setSuccessMessage("Registration successful! You can now login.");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred.";
      setErrors({ apiError: errorMessage });
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 400 }}>
        <Header as="h2" color="black" textAlign="center">
          Customer Registration
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Form.Input
            fluid
            placeholder="First Name"
            type="text"
            name="first_name"
            value={customer.first_name}
            onChange={handleChange}
            error={errors.first_name ? true : false}
          />
          {errors.first_name && <Message error content={errors.first_name} />}
          {/* Other input fields */}
          {/* Last Name */}
          <Form.Input
            fluid
            placeholder="Last Name"
            type="text"
            name="last_name"
            value={customer.last_name}
            onChange={handleChange}
            error={errors.last_name ? true : false}
          />
          {errors.last_name && <Message error content={errors.last_name} />}
          {/* Email */}
          <Form.Input
            fluid
            placeholder="E-mail address"
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            error={errors.email ? true : false}
          />
          {errors.email && <Message error content={errors.email} />}
          {/* Password */}
          <Form.Input
            fluid
            placeholder="Password"
            type="password"
            name="password"
            value={customer.password}
            onChange={handleChange}
            error={errors.password ? true : false}
          />
          {errors.password && <Message error content={errors.password} />}
          {/* Confirm Password */}
          <Form.Input
            fluid
            placeholder="Confirm Password"
            type="password"
            name="confirm_password"
            value={customer.confirm_password}
            onChange={handleChange}
            error={errors.confirm_password ? true : false}
          />
          {errors.confirm_password && (
            <Message error content={errors.confirm_password} />
          )}
          {/* Address */}
          <Form.Input
            fluid
            placeholder="Address"
            type="text"
            name="address"
            value={customer.address}
            onChange={handleChange}
            error={errors.address ? true : false}
          />
          {errors.address && <Message error content={errors.address} />}
          {/* Phone Number */}
          <Form.Input
            fluid
            placeholder="Phone Number"
            type="tel"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            error={errors.phone ? true : false}
          />
          {errors.phone && <Message error content={errors.phone} />}
          {/* State */}
          <Form.Input
            fluid
            placeholder="State"
            type="text"
            name="state"
            value={customer.state}
            onChange={handleChange}
            error={errors.state ? true : false}
          />
          {errors.state && <Message error content={errors.state} />}
          {/* City */}
          <Form.Input
            fluid
            placeholder="City"
            type="text"
            name="city"
            value={customer.city}
            onChange={handleChange}
            error={errors.city ? true : false}
          />
          {errors.city && <Message error content={errors.city} />}
          {/* Zip Code */}
          <Form.Input
            fluid
            placeholder="Zip Code"
            type="text"
            name="zipcode"
            value={customer.zipcode}
            onChange={handleChange}
            error={errors.zipcode ? true : false}
          />
          {errors.zipcode && <Message error content={errors.zipcode} />}
          {/* Date of Birth */}
          <Form.Input
            fluid
            label="Date of Birth"
            type="date"
            name="dob"
            value={customer.dob}
            onChange={handleChange}
            error={errors.dob ? true : false}
          />
          {errors.dob && <Message error content={errors.dob} />}
          {errors.apiError && (
            <Message negative>
              <Message.Header>Error:</Message.Header>
              <p>{errors.apiError}</p>
            </Message>
          )}
          {successMessage && (
            <Message positive>
              <Message.Header>Success:</Message.Header>
              <p>{successMessage}</p>
            </Message>
          )}
          <Button
            style={{ ...primaryObj, borderRadius: 16 }}
            fluid
            size="large"
            type="submit"
          >
            Register
          </Button>
        </Form>
        <div>
          Already have an account? <a href="/login">Log In</a>
        </div>
      </Grid.Column>
    </Grid>
  );
};

export default CustomerRegister;
