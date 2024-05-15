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
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
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
