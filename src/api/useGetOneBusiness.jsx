import { useState, useEffect } from "react";
import axios from "axios";

const useGetOneBusiness = (user) => {
  const [business, setBusiness] = useState({});
  useEffect(() => {
    const getOneBusiness = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/register/business-entity?userEmail=${user.email}`
        );
        if (response.status !== 200) {
          throw new Error(`${response.status} ${response.statusText}`);
        } else {
          setBusiness(response.data);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getOneBusiness();
  }, [user.email]);

  return { business, setBusiness };
};

export default useGetOneBusiness;
