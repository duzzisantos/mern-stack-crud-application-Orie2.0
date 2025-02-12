import { useEffect, useState } from "react";
import axios from "axios";
import { getHost } from "../helpers/getHost";

const useGetFollowedContent = (user, token) => {
  const [subscribedContent, setSubscribedContent] = useState([]);

  useEffect(() => {
    const getFollowedContent = async () => {
      try {
        const response = await axios.get(
          `${getHost()}/api/user-posts/subscribed-content?userEmail=${
            user.email
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
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
  }, [token, user]);

  return { subscribedContent, setSubscribedContent };
};

export default useGetFollowedContent;
