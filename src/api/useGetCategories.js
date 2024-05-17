import { useEffect, useState } from "react";
import axios from "axios";
import { getHost } from "../helpers/getHost";

const useGetCategories = (token) => {
  const [categories, setCategories] = useState([]);

  //Fetch all categories registered since time immemorial
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          `${getHost()}/api/register/categories`,
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
          const uniqueCategories = [...new Set(response.data.map((el) => el))];
          setCategories(uniqueCategories);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getCategories();
  }, [token]);

  return { categories, setCategories };
};

export default useGetCategories;
