import axios from "axios";

const getNarrowSearch = async (setNarrowSearch, region, city, category) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/query-business/narrow-search?region=${region}&city=${city}&category=${category}`
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
