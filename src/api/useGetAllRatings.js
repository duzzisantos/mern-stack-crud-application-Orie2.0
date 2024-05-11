import { useEffect, useState } from "react";
import axios from "axios";

const useGetAllRatings = (token) => {
  const [allRatings, setAllRatings] = useState([]);
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/ratings`, {
          headers: {
            Authorization: token,
          },
        });
        if (response.status !== 200) {
          throw new Error(`${response.status} ${response.statusText}`);
        } else {
          setAllRatings(response.data);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getFollowing();
  }, [token]);

  return { allRatings, setAllRatings };
};

export default useGetAllRatings;
