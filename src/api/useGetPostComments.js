import { useEffect, useState } from "react";
import axios from "axios";

const useGetPostComments = (authorEmail, id) => {
  const [comments, setComments] = useState([]);

  //Fetch all comments registered
  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user-posts/comments?userEmail=${authorEmail}&id=${id}`
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
  }, [authorEmail, id]);

  return { comments, setComments };
};

export default useGetPostComments;
