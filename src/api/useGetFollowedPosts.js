import { useEffect, useState } from "react";
import axios from "axios";

const useGetFollowedContent = (user) => {
  const [subscribedContent, setSubscribedContent] = useState([]);

  useEffect(() => {
    const getFollowedContent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user-posts/subscribed-content?userEmail=${user.email}`
        );
        if (response.status !== 200) {
          throw new Error(`${response.status} ${response.statusText}`);
        } else {
          setSubscribedContent(response.data);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getFollowedContent();
  }, [user]);

  return { subscribedContent, setSubscribedContent };
};

export default useGetFollowedContent;
