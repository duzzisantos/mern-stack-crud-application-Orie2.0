import { useEffect, useState } from "react";
import axios from "axios";
import { getHost } from "../helpers/getHost";

const useGetPostComments = (secondParty, id, token) => {
  const [comments, setComments] = useState([]);

  //Fetch all comments registered
  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(
          `${getHost()}/api/user-posts/comments?userEmail=${secondParty}&id=${id}`,
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
          setComments(response.data);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getComments();
  }, [secondParty, id, token]);

  return { comments, setComments };
};

export default useGetPostComments;
