import React from "react";
import Loading from "./Loading";

const TeamListTable = ({ data, loading }) => {
  return (
    <>
      {loading ? (
        <div className="overflow-auto border-2 border-slate-400 rounded-lg shadow hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr className="text-lg">
                <th className="w-20 py-3 px-4 font-semibold tracking-wide text-left">
                  Name
                </th>
                <th className="py-3 px-4 font-semibold tracking-wide text-left">
                  Email
                </th>
                <th className="w-24 py-3 px-4 font-semibold tracking-wide text-left">
                  Role
                </th>
                <th className="w-24 py-3 px-4 font-semibold tracking-wide text-left">
                  User Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data?.map((value) => (
                <tr key={value._id} className="hover:bg-slate-200">
                  <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                    {value.user.name}
                  </td>
                  <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                    {value.user.email}
                  </td>
                  <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                    {value.userRole}
                  </td>
                  {value.rejected === true ? (
                    <td className="text-red-600 py-3 px-4 whitespace-nowrap">
                      Rejected
                    </td>
                  ) : value.status === true ? (
                    <td className="text-lime-600 py-3 px-4 whitespace-nowrap">
                      Active
                    </td>
                  ) : value.status === false ? (
                    <td className="text-blue-600 py-3 px-4 whitespace-nowrap">
                      Pending
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Loading />
      )}

      {/* For small size devices */}
      {loading ? (
        <div className="max-h-64 overflow-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:hidden">
          {data?.map((value) => (
            <div
              key={value._id}
              className="bg-slate-100 space-y-3 px-4 py-3 rounded-lg shadow"
            >
              <div className="flex justify-between items-center space-x-2 text-sm">
                <h6 className="text-gray-700 font-semibold">
                  {value.user.name}
                </h6>
                {value.rejected === true ? (
                  <p className="text-red-600">Rejected</p>
                ) : value.status === true ? (
                  <p className="text-lime-600">Active</p>
                ) : value.status === false ? (
                  <p className="text-blue-600">Pending</p>
                ) : null}
              </div>
              <div className="text-sm text-gray-700">
                Email : {value.user.email}
              </div>
              <div className="text-sm font-medium text-black">
                Role : {value.userRole}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default TeamListTable;
