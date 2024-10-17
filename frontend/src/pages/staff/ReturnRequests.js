import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Table,
  Message,
  Dropdown,
  Button,
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import api from "../../utils/api";

const ReturnRequests = () => {
  const [returnRequests, setReturnRequests] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchReturnRequests = async () => {
      try {
        const response = await api.get("/return-requests");
        setReturnRequests(response.data);
      } catch (error) {
        setErrorMessage(
          "Failed to fetch return requests. Please try again later."
        );
        console.error("Fetch return requests error:", error);
      }
    };

    const fetchStaffList = async () => {
      try {
        const response = await api.get("/staff");
        const staffOptions = response.data.map((staff) => ({
          key: staff._id,
          text: staff.first_name + " " + staff.last_name,
          value: staff._id,
        }));
        setStaffList(staffOptions);
      } catch (error) {
        console.error("Fetch staff list error:", error);
      }
    };

    fetchReturnRequests();
    fetchStaffList();
  }, []);

  const handleAssignStaff = async (returnRequestId) => {
    try {
      await api.put(`/return-requests/${returnRequestId}/assign-staff`, {
        staff_id: selectedStaff,
      });
      // Optionally, you can display a success message here
      console.log("Staff assigned successfully!");
    } catch (error) {
      console.error("Assign staff error:", error);
      // Optionally, you can display an error message here
    }
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Header as="h2">Return Requests</Header>
      {errorMessage && <Message negative>{errorMessage}</Message>}
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Order ID</Table.HeaderCell>
            <Table.HeaderCell>Return Reason</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {returnRequests.map((request) => (
            <Table.Row key={request._id}>
              <Table.Cell>{request.order_id}</Table.Cell>
              <Table.Cell>{request.return_reason}</Table.Cell>
              <Table.Cell>{request.status}</Table.Cell>
              <Table.Cell>
                <Dropdown
                  placeholder="Assign Staff"
                  selection
                  options={staffList}
                  onChange={(e, { value }) => setSelectedStaff(value)}
                  value={selectedStaff}
                />
                <Button
                  primary
                  onClick={() => handleAssignStaff(request._id)}
                  disabled={!selectedStaff}
                  style={{ marginLeft: "1em" }}
                >
                  Assign Staff
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default ReturnRequests;
