import { useEffect, useState } from "react";
import axios from "axios";

const useGetFollowers = (user) => {
  const [followers, setFollowers] = useState([]);
  //Fetch all the users following current user
  useEffect(() => {
    const getFollowers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/followers/get-followers?clientUID=${user.uid}`
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
  }, [user]);

  return { followers, setFollowers };
};

export default useGetFollowers;
