import { useEffect, useState } from "react";
import axios from "axios";
import { getHost } from "../helpers/getHost";

const useGetGroupedBusinesses = (token) => {
  const [grouped, setGrouped] = useState([]);

  //Fetch all businesses registered
  useEffect(() => {
    const getBusinesses = async () => {
      try {
        const response = await axios.get(`${getHost()}/api/register/grouped`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (response.status !== 200) {
          throw new Error(`${response.status} ${response.statusText}`);
        } else {
          setGrouped(response.data);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getBusinesses();
  }, [token]);

  return { grouped, setGrouped };
};

export default useGetGroupedBusinesses;
