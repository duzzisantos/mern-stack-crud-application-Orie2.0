import { useEffect, useState } from "react";
import axios from "axios";
import { getHost } from "../helpers/getHost";

const useGetRatings = (user) => {
  const [rating, setRating] = useState([]);
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const response = await axios.get(
          `${getHost()}/api/ratings/received?userEmail=${user.email}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
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
  }, [user]);

  return { rating, setRating };
};

export default useGetRatings;
