import { useEffect, useState } from "react";
import axios from "axios";
import { getHost } from "../helpers/getHost";

const useGetAllUserContent = (user, token) => {
  const [userContent, setUserContent] = useState([]);

  useEffect(() => {
    const getAllUserContent = async () => {
      try {
        const response = await axios.get(
          `${getHost()}/api/user-posts/?userEmail=${user.email}`,
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
          setUserContent(response.data);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getAllUserContent();
  }, [user, token]);

  return { userContent, setUserContent };
};

export default useGetAllUserContent;
