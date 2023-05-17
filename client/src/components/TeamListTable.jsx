import React from "react";
import { Table } from "react-bootstrap";

const TeamListTable = () => {
  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email ID</th>
            <th>Role</th>
            <th>User Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@twitter</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default TeamListTable;
