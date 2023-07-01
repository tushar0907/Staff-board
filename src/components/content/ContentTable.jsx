import React, { useState } from "react";
import EditPopup from "../EditPopup";
import { useAppContext } from "../../context";

const ContentTable = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const { handleRemoveRole, handleRemoveStaff, stores, users, setSelectedStore, selectedStore, activeRoles } = useAppContext();

  const togglePopup = (staff) => {
    setSelectedStaff(staff);
    setShowPopup(!showPopup);
  };

  const handleStoreSelection = (store) => {
    setSelectedStore(store);
  };

  return (
    <div className="flex w-full flex-col h-full">
      <div className="flex h-[7vh]">
        <div className="flex h-full w-9/12 justify-between items-center p-4">
          {stores?.map((store, index) => (
            <div
              key={index}
              onClick={() => setSelectedStore(store)}
              className={`flex cursor-pointer text-[#bfa2a2] hover:text-white border border-[#bfa2a2] hover:bg-[#1702fe] ${selectedStore?.storeId === store.storeId && "bg-[#1702fe] text-white"} h-[4vh] w-[6vw] font-medium justify-center items-center rounded-full`}
            >
              {store.name}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-1">
        <div className="flex">
          <table className="flex flex-col w-full pl-6">
            <thead className="flex bg-gray-300 h-[5vh] border-l border-r border-gray-300 w-[80vw]">
              <tr className="flex items-center w-[28vw] justify-between pl-3">
                <th className="flex flex-1">Staff</th>
                <th className="flex flex-1">Mobile Number</th>
                <th className="flex flex-1">Role</th>
              </tr>
            </thead>
            <tbody className="flex flex-col border-b border-l border-r border-gray-300 w-[80vw]">
              {users?.map((staff) => (
                <div
                  className="flex h-[8vh] border border-b"
                  key={staff.staffId}
                >
                  <tr className="flex w-[28vw] justify-between pl-3 items-center">
                    <td className="flex items-center h-full w-[9vw]">
                      {staff.name}
                    </td>
                    <td className="flex items-center h-full w-[9vw]">
                      {staff.mobile}
                    </td>
                    <td className="flex items-center text-[16px] h-full w-[9vw] justify-start pr-4">
                      {activeRoles?.find(user => user.mobile === staff.mobile)?.role?.replaceAll("_", " ") || "No Role"}
                    </td>
                  </tr>

                  <tr className="flex flex-1 opacity-0 hover:opacity-100 justify-end items-start">
                    <td className="flex h-full">
                      <div className="flex text-sm justify-end items-center w-[37vw] pr-4">
                        <div className="flex w-[23vw] h-[3.6vh] justify-between">
                          {staff.role !== "No Role" && (
                            <button
                              className="flex p-1 h-full rounded-md items-center border border-black"
                              onClick={() => handleRemoveRole(staff.staffId)}
                            >
                              Remove Role
                            </button>
                          )}
                          <button
                            onClick={() => togglePopup(staff)}
                            className="flex p-2  h-full rounded-md items-center border border-black"
                          >
                            Change Role
                          </button>
                          <button
                            onClick={() => togglePopup(staff)}
                            className="flex p-2 h-full rounded-md items-center border border-black"
                          >
                            Rename Staff
                          </button>

                          <button
                            className="flex p-2 h-full rounded-md items-center border border-red-600 text-red-600"
                            onClick={() => handleRemoveStaff(staff.staffId)}
                          >
                            Delete Staff
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </div>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showPopup && (
        <EditPopup togglePopup={togglePopup} staff={selectedStaff} />
      )}
    </div>
  );
};

export default ContentTable;
