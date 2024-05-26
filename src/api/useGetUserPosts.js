import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { getHost } from "../helpers/getHost";

const useGetAllUserContent = (user, token) => {
  const [userContent, setUserContent] = useState([]);

  const getAllUserContent = useCallback(async () => {
    try {
      const response = await axios.get(
        `${getHost()}/api/user-posts/?userEmail=${user.email}`,
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
        setUserContent(response.data);
      }
    } catch (err) {
      console.warn(err);
    }
  }, [user.email, token]);

  useEffect(() => {
    getAllUserContent();
  }, [getAllUserContent]);

  return { userContent, refetch: getAllUserContent };
};

export default useGetAllUserContent;
