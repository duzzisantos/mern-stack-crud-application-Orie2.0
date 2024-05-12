import axios from "axios";
import { getHost } from "../helpers/getHost";

const getGeneralSearch = async (setGeneralSearch, searchTerm, token) => {
  try {
    const response = await axios.get(
      `${getHost()}/api/query-business/general-search?searchTerm=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error(`${response.status} ${response.statusText}`);
    } else {
      setGeneralSearch(response.data);
    }
  } catch (err) {
    console.warn(err);
  }
};

export default getGeneralSearch;
