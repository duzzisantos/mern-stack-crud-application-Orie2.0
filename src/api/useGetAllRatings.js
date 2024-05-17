import { useEffect, useState } from "react";
import axios from "axios";
import { getHost } from "../helpers/getHost";

const useGetAllRatings = () => {
  const [allRatings, setAllRatings] = useState([]);
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const response = await axios.get(`${getHost()}/api/ratings`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
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
  });

  return { allRatings, setAllRatings };
};

export default useGetAllRatings;
