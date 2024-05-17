import { useState, useEffect } from "react";
import axios from "axios";
import { getHost } from "../helpers/getHost";

const useGetOneBusiness = (user, token) => {
  const [biz, setBiz] = useState([]);
  useEffect(() => {
    const getOneBusiness = async () => {
      try {
        const response = await axios.get(
          `${getHost()}/api/register/business-entity?clientUID=${user.uid}`,
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
