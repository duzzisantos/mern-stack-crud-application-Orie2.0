import { useEffect, useState } from "react";
import axios from "axios";

const useGetRegions = () => {
  const [categories, setRegions] = useState([]);

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
          setRegions(response.data);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getRegions();
  }, []);

  return { categories, setRegions };
};

export default useGetRegions;
