import { useEffect, useState } from "react";
import axios from "axios";
import { getHost } from "../helpers/getHost";

const useGetMessages = (user, token) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          `${getHost()}/api/direct-messages?clientUID=${user.uid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
  }, [user, token]);

  return { messages, setMessages };
};

export default useGetMessages;
