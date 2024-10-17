import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Table } from "semantic-ui-react";
import api from "../../utils/api";

const AdminStaffList = () => {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await api.get("/staff");
      setStaffList(response.data);
    } catch (error) {
      console.error("Error fetching staff list:", error);
    }
  };
  const handleDeleteStaff = async (id) => {
    try {
      await api.delete(`/staff/${id}`);
      setStaffList(staffList.filter((staff) => staff._id !== id));
    } catch (error) {
      console.error("Error deleting staff member:", error);
    }
  };

  const handleApproveStaff = async (id) => {
    try {
      await api.put(`/staff/${id}/status`, { status: "Approved" });
      fetchStaffList();
    } catch (error) {
      console.error("Error approving staff member:", error);
    }
  };

  const handleApproveStaffDisapprove = async (id) => {
    try {
      await api.put(`/staff/${id}/status`, { status: "Disapproved" });
      fetchStaffList();
    } catch (error) {
      console.error("Error approving staff member:", error);
    }
  };

  const handleRejectStaff = async (id) => {
    try {
      await api.put(`/staff/${id}/status`, { status: "Rejected" });
      const updatedStaffList = staffList.map((staff) => {
        if (staff._id === id) {
          return { ...staff, status: "Rejected" };
        }
        return staff;
      });
      fetchStaffList();
    } catch (error) {
      console.error("Error rejecting staff member:", error);
    }
  };

  return (
    <>
      <Header as="h2" textAlign="center" style={{ marginTop: "2rem" }}>
        Staff List
      </Header>
      <Button
        as={Link}
        to="/admin/staff/create"
        color="blue"
        style={{ marginBottom: "1rem" }}
      >
        Create Staff
      </Button>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Phone Number</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>State</Table.HeaderCell>
            <Table.HeaderCell>Zip Code</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Disapprove</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {staffList.map((staff) => (
            <Table.Row key={staff._id}>
              <Table.Cell>{staff.first_name}</Table.Cell>
              <Table.Cell>{staff.last_name}</Table.Cell>
              <Table.Cell>{staff.email}</Table.Cell>
              <Table.Cell>{staff.phone_number}</Table.Cell>
              <Table.Cell>{staff.city}</Table.Cell>
              <Table.Cell>{staff.state}</Table.Cell>
              <Table.Cell>{staff.zipcode}</Table.Cell>
              <Table.Cell>{staff.status}</Table.Cell>
              <Table.Cell>
                <Button
                  as={Link}
                  to={`/admin/staff/${staff._id}/edit`}
                  color="blue"
                  size="small"
                  style={{ marginRight: "0.5rem" }}
                >
                  Edit
                </Button>
                {staff.status === "Pending" && (
                  <>
                    <Button
                      color="green"
                      size="small"
                      onClick={() => handleApproveStaff(staff._id)}
                      style={{ marginRight: "0.5rem" }}
                    >
                      Approve
                    </Button>
                    <Button
                      color="red"
                      size="small"
                      onClick={() => handleRejectStaff(staff._id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </Table.Cell>
              <Table.Cell>
                {staff.status === "Approved" && <Button
                  color="red"
                  size="small"
                  onClick={() => handleApproveStaffDisapprove(staff._id)}
                >
                  Disapprove
                </Button>}
                {staff.status === "Disapproved" && <Button
                      color="green"
                      size="small"
                      onClick={() => handleApproveStaff(staff._id)}
                      style={{ marginRight: "0.5rem" }}
                    >
                      Approve
                    </Button>}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default AdminStaffList;
