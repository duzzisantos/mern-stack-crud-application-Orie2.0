import { useEffect, useState } from "react";
import axios from "axios";

const useGetCategories = () => {
  const [categories, setCategories] = useState([]);

  //Fetch all categories registered since time immemorial
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/register/categories`
        );
        if (response.status !== 200) {
          throw new Error(`${response.status} ${response.statusText}`);
        } else {
          setCategories(response.data);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getCategories();
  }, []);

  return { categories, setCategories };
};

export default useGetCategories;
