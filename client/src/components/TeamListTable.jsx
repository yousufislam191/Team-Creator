import React from "react";
import { Table } from "react-bootstrap";

const TeamListTable = (value) => {
  console.log(value);
  const { status, userRole } = value;
  // const { name, email } = value.user;
  return (
    <>
      {/* <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email ID</th>
            <th>Role</th>
            <th>User Status</th>
          </tr>
        </thead>
        <tbody> */}
      <tr>
        {/* <td>value</td> */}
        <td>{value.user?.name}</td>
        <td>{value.user?.email}</td>
        <td>{userRole}</td>
        <td>{status === true ? "Active" : null}</td>
      </tr>
      {/* </tbody>
      </Table>  */}
    </>
  );
};

export default TeamListTable;
