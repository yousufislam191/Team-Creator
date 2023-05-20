import React from "react";
import { Table } from "react-bootstrap";

const TeamListTable = ({ data }) => {
  return (
    <>
      <Table hover className="table-fixed">
        <thead>
          <tr className="text-lg">
            <th>Name</th>
            <th>Email ID</th>
            <th>Role</th>
            <th>User Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((value) => (
            <tr key={value._id}>
              <th>{value.user.name}</th>
              <th>{value.user.email}</th>
              <th>{value.userRole}</th>
              {value.rejected === true ? (
                <th className="text-red-600">Rejected</th>
              ) : value.status === true ? (
                <th className="text-lime-600">Active</th>
              ) : value.status === false ? (
                <th className="text-blue-600">Pending</th>
              ) : null}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TeamListTable;
