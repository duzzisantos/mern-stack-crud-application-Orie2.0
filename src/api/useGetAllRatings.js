import { useEffect, useState } from "react";
import axios from "axios";
import { isLocal, isProduction, localHost, server } from "../helpers/getHost";

const useGetAllRatings = (token) => {
  const [allRatings, setAllRatings] = useState([]);
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const response = await axios.get(
          `${isLocal ? localHost : isProduction && server}/api/ratings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
