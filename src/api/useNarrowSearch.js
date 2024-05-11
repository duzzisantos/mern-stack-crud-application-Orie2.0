import axios from "axios";
import { getHost } from "../helpers/getHost";

const getNarrowSearch = async (
  setNarrowSearch,
  region,
  city,
  category,
  token
) => {
  try {
    const response = await axios.get(
      `${getHost()}/api/query-business/narrow-search?region=${region}&city=${city}&category=${category}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error(`${response.status} ${response.statusText}`);
    } else {
      setNarrowSearch(response.data);
    }
  } catch (err) {
    console.warn(err.message);
  }
};

export default getNarrowSearch;
