import axios from "axios";

const getGeneralSearch = async (setGeneralSearch, searchTerm) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/query-business/general-search?searchTerm=${searchTerm}`
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
