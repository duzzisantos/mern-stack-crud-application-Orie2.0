import { useEffect, useState } from "react";
import axios from "axios";
import { getHost } from "../helpers/getHost";

const useGetRegions = (token) => {
  const [regions, setRegions] = useState([]);

  //Fetch all Regionsregistered since time immemorial
  useEffect(() => {
    const getRegions = async () => {
      try {
        const response = await axios.get(`${getHost()}/api/register/regions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status !== 200) {
          throw new Error(`${response.status} ${response.statusText}`);
        } else {
          const uniqueRegions = [...new Set(response.data.map((el) => el))];
          setRegions(uniqueRegions);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getRegions();
  }, [token]);

  return { regions, setRegions };
};

export default useGetRegions;
