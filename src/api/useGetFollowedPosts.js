import { useEffect, useState } from "react";
import axios from "axios";

const useGetFollowedContent = (user, token) => {
  const [subscribedContent, setSubscribedContent] = useState([]);

  useEffect(() => {
    const getFollowedContent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user-posts/subscribed-content?userEmail=${user.email}`,
          {
            headers: {
              Authorization: token,
            },
          }
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
  }, [user, token]);

  return { subscribedContent, setSubscribedContent };
};

export default useGetFollowedContent;
