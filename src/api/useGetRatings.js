import { useEffect, useState } from "react";
import axios from "axios";

const useGetRatings = (user) => {
  const [rating, setRating] = useState([]);
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/ratings?userEmail=${user.email}`
        );
        if (response.status !== 200) {
          throw new Error(`${response.status} ${response.statusText}`);
        } else {
          setRating(response.data);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getFollowing();
  }, [user.email]);

  return { rating, setRating };
};

export default useGetRatings;
