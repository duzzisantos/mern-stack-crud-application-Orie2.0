import { useState, useEffect } from "react";
import { getHost } from "../helpers/getHost";
import axios from "axios";

const useGetCustomerMedia = (user) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const response = await axios.get(
          `${getHost()}/api/upload-image?clientID=${user.uid}`,
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status !== 200) {
          throw new Error(`${response.status} ${response.statusText}`);
        } else {
          setPhotos(response.data);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getPhotos();
  }, [user]);

  return { photos, setPhotos };
};

export default useGetCustomerMedia;
