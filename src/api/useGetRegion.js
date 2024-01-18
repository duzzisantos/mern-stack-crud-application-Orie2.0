import { useEffect, useState } from "react";
import axios from "axios";

const useGetRegions = () => {
  const [regions, setRegions] = useState([]);

  //Fetch all Regionsregistered since time immemorial
  useEffect(() => {
    const getRegions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/register/regions`
        );
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
  }, []);

  return { regions, setRegions };
};

export default useGetRegions;
