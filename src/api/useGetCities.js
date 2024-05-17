import { useEffect, useState } from "react";
import axios from "axios";
import { getHost } from "../helpers/getHost";

const useGetCities = (token) => {
  const [cities, setCities] = useState([]);

  //Fetch all cities registered since time immemorial
  useEffect(() => {
    const getCities = async () => {
      try {
        const response = await axios.get(`${getHost()}/api/register/cities`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (response.status !== 200) {
          throw new Error(`${response.status} ${response.statusText}`);
        } else {
          const uniqueCities = [...new Set(response.data.map((el) => el))];
          setCities(uniqueCities);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getCities();
  }, [token]);

  return { cities, setCities };
};

export default useGetCities;
