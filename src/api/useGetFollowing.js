import { useEffect, useState } from "react";
import axios from "axios";

const useGetFollowing = (user) => {
  const [following, setFollowing] = useState([]);
  //Fetch all users current user is following
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/followers/get-following?userEmail=${user.email}`
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
  }, [user.email]);

  return { following, setFollowing };
};

export default useGetFollowing;