import axios from "axios";
import React from "react";

const AppContext = React.createContext({});

const BASE_URL = "http://stock.staging3.digitalregister.in:8080/api";

export const Provider = ({ children }) => {
  const [users, setUsers] = React.useState([]);
  const [stores, setStores] = React.useState([]);
  const [selectedStore, setSelectedStore] = React.useState([]);
  const [activeRoles, setActiveRoles] = React.useState([]);

  React.useEffect(() => {
    const getAccessControl = async (firebaseUserId, mobile) => {
      try {
        const res = await axios.post(`${BASE_URL}/v1/staffAccess/getDetails`, {
          firebaseUserId,
          mobile,
        });

        return res.data.staffDetails;
      } catch (e) {
        return [];
      }
    };

    axios
      .post(`${BASE_URL}/v1/staff/get`, {
        businessIds: ["VgwLq1sKrUdkxsSuTKEhEF5b8KG3"],
      })
      .then(async (response) => {
        const promises = response.data.response.map(async (res) => {
            const otherDetails = await getAccessControl(res.staffId, res.mobile)
            return {
                ...res,
                other: otherDetails
            }
        });

        const result = await Promise.all(promises)
        setUsers(result)
      })
      .catch((error) => {
        console.error("Error fetching staff data:", error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(
        `${BASE_URL}/v1/store/getStore/VgwLq1sKrUdkxsSuTKEhEF5b8KG3`
      )
      .then((response) => {
        setStores(response.data.response);
        if (response.data.response.length > 0) {
            setSelectedStore(response.data.response[0])
        }
      })

      .catch((error) => {
        console.error("Error fetching store names:", error);
      });
  }, []);

  React.useEffect(() => {
    const result = users.map(({mobile, other}) => {
        const existingRoles = other.filter(({storeAccessList}) => {
            const find = storeAccessList.find((store) => store.storeId === selectedStore.storeId);
            return find
        })

        if (existingRoles && existingRoles.length > 0) {
            return {
                mobile,
                role: existingRoles[0].storeAccessList.find(store => store.storeId === selectedStore.storeId).access
            }
        } else return {mobile, role: null}
    })
    setActiveRoles(result)

    // eslint-disable-next-line
  }, [selectedStore]);

  const handleRemoveRole = (staffId) => {
    const updatedStaffData = users.map((staff) => {
      if (staff.staffId === staffId) {
        return {
          ...staff,
          role: "No Role",
        };
      }
      return staff;
    });

    setUsers(updatedStaffData);
  };

  const handleRemoveStaff = (staffId) => {
    axios
      .delete(
        `http://stock.staging3.digitalregister.in:8080/api/v1/staff/delete/${staffId}`
      )
      .then((response) => {
        if (response.data.response) {
          const updatedStaffData = users.filter(
            (staff) => staff.staffId !== staffId
          );
          setUsers(updatedStaffData);
        }
      })
      .catch((error) => {
        console.error("Error deleting staff:", error);
      });
  };

  return (
    <AppContext.Provider
      value={{
        users,
        stores,
        selectedStore,
        setSelectedStore,
        handleRemoveRole,
        handleRemoveStaff,
        activeRoles
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
