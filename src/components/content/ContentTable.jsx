import React, { useEffect, useState } from "react";
import axios from "axios";
import EditPopup from "../EditPopup";

const ContentTable = () => {
  const [staffData, setStaffData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    axios
      .post("http://stock.staging3.digitalregister.in:8080/api/v1/staff/get", {
        businessIds: ["VgwLq1sKrUdkxsSuTKEhEF5b8KG3"],
      })
      .then((response) => {
        setStaffData(response.data.response);
        localStorage.setItem(
          "staffData",
          JSON.stringify(response.data.response)
        );
      })
      .catch((error) => {
        console.error("Error fetching staff data:", error);
      });
  }, []);

  const handleRemoveRole = (staffId) => {
    const updatedStaffData = staffData.map((staff) => {
      if (staff.staffId === staffId) {
        return {
          ...staff,
          role: "No Role",
        };
      }
      return staff;
    });

    setStaffData(updatedStaffData);
    localStorage.setItem("staffData", JSON.stringify(updatedStaffData));
  };

  const handleRemoveStaff = (staffId) => {
    axios
      .delete(
        `http://stock.staging3.digitalregister.in:8080/api/v1/staff/delete/${staffId}`
      )
      .then((response) => {
        if (response.data.response) {
          const updatedStaffData = staffData.filter(
            (staff) => staff.staffId !== staffId
          );
          setStaffData(updatedStaffData);
          localStorage.setItem("staffData", JSON.stringify(updatedStaffData));
        }
      })
      .catch((error) => {
        console.error("Error deleting staff:", error);
      });
  };

  const togglePopup = (staff) => {
    setSelectedStaff(staff);
    setShowPopup(!showPopup);
  };

  return (
    <div className="flex w-full flex-col h-full">
      <div className="flex h-[7vh]">
        <div className="flex h-full text-[] w-[14vw] justify-between items-center p-4">
          <div className="flex cursor-pointer text-[#bfa2a2] hover:text-white border border-[#bfa2a2] hover:bg-[#1702fe] h-[4vh] w-[6vw] font-medium justify-center items-center rounded-full">
            Store A
          </div>
          <div className="flex cursor-pointer border border-[#bfa2a2] text-[#bfa2a2] hover:text-white hover:bg-[#1702fe] h-[4vh] w-[6vw] font-medium justify-center items-center rounded-full">
            Store B
          </div>
        </div>
      </div>
      <div className="flex flex-1">
        <div className="flex">
          <table className="flex flex-col w-full pl-6">
            <thead className="flex bg-gray-300 h-[5vh] border-l border-r border-gray-300 w-[80vw]">
              <tr className="flex items-center w-[26vw] justify-between pl-3">
                <th>Staff</th>
                <th>Mobile Number</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody className="flex flex-col border-b border-l border-r border-gray-300 w-[80vw]">
              {staffData.map((staff) => (
                <div className="flex h-[8vh]">
                  <React.Fragment key={staff.staffId}>
                  <tr
                    key={staff.staffId}
                    className="flex w-[28vw] justify-between pl-3 items-center"
                  >
                    <td className="flex items-center h-full w-[9vw]">{staff.name}</td>
                    <td className="flex items-center h-full w-[9vw]">{staff.mobile}</td>
                    <td className="flex items-center h-full w-[9vw] justify-end">{staff.role}</td>
                  </tr>

                  <tr className="flex flex-1 justify-end items-start">
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
                          className="flex p-2  h-full rounded-md items-center border border-black">
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
                </React.Fragment>
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
