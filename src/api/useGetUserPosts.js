import { useEffect, useState } from "react";
import axios from "axios";

const useGetAllUserContent = (user) => {
  const [userContent, setUserContent] = useState([]);

  useEffect(() => {
    const getAllUserContent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user-posts/?userEmail=${user.email}`
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
