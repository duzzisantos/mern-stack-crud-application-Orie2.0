import { useEffect, useState } from "react";
import axios from "axios";
import { getHost } from "../helpers/getHost";

const useGetAllUserContent = (user) => {
  const [userContent, setUserContent] = useState([]);

  useEffect(() => {
    const getAllUserContent = async () => {
      try {
        const response = await axios.get(
          `${getHost()}/api/user-posts/?userEmail=${user.email}`,
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
          setUserContent(response.data);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getAllUserContent();
  }, [user]);

  return { userContent, setUserContent };
};

export default useGetAllUserContent;
