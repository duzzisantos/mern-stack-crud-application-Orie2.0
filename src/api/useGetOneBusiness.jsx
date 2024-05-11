import { useState, useEffect } from "react";
import axios from "axios";

const useGetOneBusiness = (user, token) => {
  const [biz, setBiz] = useState([]);
  useEffect(() => {
    const getOneBusiness = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/register/business-entity?clientUID=${user.uid}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.status !== 200) {
          throw new Error(`${response.status} ${response.statusText}`);
        } else {
          setBiz(response.data);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getOneBusiness();
  }, [user, token]);

  return { biz, setBiz };
};

export default useGetOneBusiness;
