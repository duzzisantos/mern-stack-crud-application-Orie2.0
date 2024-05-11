import { useEffect, useState } from "react";
import axios from "axios";

const useSuggestedFollows = (user, token) => {
  const [suggestedFollows, setSuggestedFollows] = useState([]);

  useEffect(() => {
    const getSuggestedFollows = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/followers/suggested-follows?clientUID=${user.uid}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.status !== 200) {
          throw new Error(`${response.status} ${response.statusText}`);
        } else {
          setSuggestedFollows(response.data);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getSuggestedFollows();
  }, [user, token]);

  return { suggestedFollows, setSuggestedFollows };
};

export default useSuggestedFollows;
