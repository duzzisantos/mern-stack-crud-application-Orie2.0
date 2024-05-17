import { useEffect, useState } from "react";
import axios from "axios";
import { getHost } from "../helpers/getHost";

const useGetFollowing = (user) => {
  const [following, setFollowing] = useState([]);
  //Fetch all users current user is following
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const response = await axios.get(
          `${getHost()}/api/followers/get-following?clientUID=${user.uid}`,
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
          setFollowing(response.data);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getFollowing();
  });

  return { following, setFollowing };
};

export default useGetFollowing;
