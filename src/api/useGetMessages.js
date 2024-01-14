import { useEffect, useState } from "react";
import axios from "axios";

const useGetMessages = (user) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/direct-messages?userEmail=${user.email}`
        );
        if (response.status !== 200) {
          throw new Error(`${response.status} ${response.statusText}`);
        } else {
          setMessages(response.data);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getMessages();
  }, [user.email]);

  return { messages, setMessages };
};

export default useGetMessages;
