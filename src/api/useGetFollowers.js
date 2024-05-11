import { useEffect, useState } from "react";
import axios from "axios";
import { getHost } from "../helpers/getHost";

const useGetFollowers = (user, token) => {
  const [followers, setFollowers] = useState([]);
  //Fetch all the users following current user
  useEffect(() => {
    const getFollowers = async () => {
      try {
        const response = await axios.get(
          `${getHost()}/api/followers/get-followers?clientUID=${user.uid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status !== 200) {
          throw new Error(`${response.status} ${response.statusText}`);
        } else {
          setFollowers(response.data);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getFollowers();
  }, [user, token]);

  return { followers, setFollowers };
};

export default useGetFollowers;
