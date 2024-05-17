import { useEffect, useState } from "react";
import axios from "axios";
import { getHost } from "../helpers/getHost";

const useGetBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);

  //Fetch all businesses registered
  useEffect(() => {
    const getBusinesses = async () => {
      try {
        const response = await axios.get(`${getHost()}/api/register`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (response.status !== 200) {
          throw new Error(`${response.status} ${response.statusText}`);
        } else {
          setBusinesses(response.data);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getBusinesses();
  });

  return { businesses, setBusinesses };
};

export default useGetBusinesses;
