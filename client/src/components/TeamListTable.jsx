import React from "react";

const TeamListTable = ({ data }) => {
  return (
    <>
      <div class="overflow-auto border-2 border-slate-400 rounded-lg shadow hidden md:block">
        <table class="w-full">
          <thead class="bg-gray-50 border-b-2 border-gray-200">
            <tr className="text-lg">
              <th class="w-20 py-3 px-4 font-semibold tracking-wide text-left">
                Name
              </th>
              <th class="py-3 px-4 font-semibold tracking-wide text-left">
                Email
              </th>
              <th class="w-24 py-3 px-4 font-semibold tracking-wide text-left">
                Role
              </th>
              <th class="w-24 py-3 px-4 font-semibold tracking-wide text-left">
                User Status
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
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

      {/* For small size devices */}
      <div class="max-h-64 overflow-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:hidden">
        {data?.map((value) => (
          <div
            key={value._id}
            class="bg-slate-100 space-y-3 px-4 py-3 rounded-lg shadow"
          >
            <div class="flex justify-between items-center space-x-2 text-sm">
              <h6 className="text-gray-700 font-semibold">{value.user.name}</h6>
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
    </>
  );
};

export default TeamListTable;
