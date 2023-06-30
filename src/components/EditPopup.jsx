import { useState } from "react";
import axios from "axios";

const EditPopup = ({ togglePopup, staff }) => {
  const [staffName, setStaffName] = useState(staff.name || "");
  const [code, setCode] = useState(staff.staffId || "");
  const [mobileNumber, setMobileNumber] = useState(staff.mobile || "");
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const handleSave = async () => {
    const errors = {};

    if (staffName.trim() === "") {
      errors.staffName = "Please fill in the Staff Name field";
    }

    if (code.trim() === "") {
      errors.code = "Please fill in the Code field";
    }

    if (mobileNumber.trim() === "") {
      errors.mobileNumber = "Please fill in the Mobile Number field";
    }

    if (selectedStore.trim() === "") {
      errors.selectedStore = "Please select a Store";
    }

    if (selectedRole.trim() === "") {
      errors.selectedRole = "Please select a Staff Role";
    }

    setErrorMessages(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "https://stock.staging3.digitalregister.in:8080/api/v1/staff/update",
          {
            businessId: "VgwLq1sKrUdkxsSuTKEhEF5b8KG3",
            name: staffName,
            phone: mobileNumber,
            staffId: code,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to update staff");
        }

        const updatedStaffData = response.data;
        console.log("Update Staff API Response:", updatedStaffData);

        console.log("Data saved successfully");
        togglePopup();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 rounded-md flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col border-2 bg-white  border-black rounded-md items-center justify-center w-[50vw] h-[76vh] text-white">
        <div className="flex border-b border justify-between w-full text-black h-[5vh]">
          <p className="flex font-bold w-[10vw] h-full justify-center items-center">
            Edit role
          </p>
          <button
            className="flex w-full justify-end items-center mx-4  text-black"
            onClick={togglePopup}
          >
            Close
          </button>
        </div>
        <div className="flex text-black bg-[#f8f9fe] w-full h-full flex-col flex-1">
          <div className="flex flex-1 flex-col">
            <div className="flex p-5">
              <div className="flex flex-col mx-4">
                <p className="flex my-3">Staff Name*</p>
                <input
                  type="text"
                  className="flex p-2 font-normal text-lg border-black border rounded-md h-[5vh] w-[20vw]"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                />
                {errorMessages.staffName && (
                  <p className="text-red-500">{errorMessages.staffName}</p>
                )}
              </div>

              <div className="flex flex-col">
                <p className="flex my-3 mx-3">Code*</p>
                <input
                  type="text"
                  className="flex p-2 font-normal text-lg border-black border rounded-md h-[5vh] w-[4vw] mx-3"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                {errorMessages.code && (
                  <p className="text-red-500">{errorMessages.code}</p>
                )}
              </div>

              <div className="flex flex-col">
                <p className="flex my-3">Mobile Number*</p>
                <input
                  type="number"
                  className="flex p-2 font-normal text-lg border-black border rounded-md h-[5vh] w-[20vw]"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                {errorMessages.mobileNumber && (
                  <p className="text-red-500">{errorMessages.mobileNumber}</p>
                )}
              </div>
            </div>
            <div className="flex p-5">
              <div className="flex flex-col mx-4">
                <p className="flex my-3">Select Store*</p>
                <select
                  className="flex p-2 font-normal text-lg border-black border rounded-md h-[5vh] w-[20vw]"
                  value={selectedStore}
                  onChange={(e) => setSelectedStore(e.target.value)}
                >
                  <option value="">-- Select Store --</option>
                  <option value="store1">Store A</option>
                  <option value="store2">Store B</option>
                  <option value="store1">Store C</option>
                  <option value="store2">Store D</option>
                </select>
                {errorMessages.selectedStore && (
                  <p className="text-red-500">{errorMessages.selectedStore}</p>
                )}
              </div>
              <div className="flex flex-col">
                <p className="flex my-3 mx-3">Staff Role*</p>
                <select
                  className="flex p-2 font-normal text-lg border-black border rounded-md mx-3 h-[5vh] w-[25vw]"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="">-- Select Staff Role --</option>
                  <option value="role1">Store Admin</option>
                  <option value="role2">Sales Operator</option>
                  <option value="role2">Sales Purchase Operator</option>
                </select>
                {errorMessages.selectedRole && (
                  <p className="text-red-500">{errorMessages.selectedRole}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-1 p-7 flex-col">
            <div className="flex flex-1">
              {staffName.trim() !== "" &&
                code.trim() !== "" &&
                mobileNumber.trim() !== "" &&
                selectedStore.trim() !== "" &&
                selectedRole.trim() !== "" && (
                  <div className="flex flex-1">
                    It will show only when all the fields will be filled
                  </div>
                )}
            </div>
            <div className="flex h-[5vh] justify-end items-center">
              <div className="flex h-full w-[15vw] justify-between">
              <button
              onClick={togglePopup}
                  className="flex bg-[#1702fe] w-32 justify-center rounded-lg text-white font-bold py-2 px-4"
                  
                >
                  Cancel
                </button>
                <button
                  className="flex bg-[#1702fe] justify-center font-bold py-2 px-4 rounded-lg text-white w-32"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;

