import axios from "axios";

function handleModifyUserPost(subEndPoint, authorEmail, id, postObject) {
  axios
    .post(
      `http://localhost:8080/api/user-posts/${subEndPoint}?userEmail=${authorEmail}&id=${id}`,
      postObject
    )
    .then((res) => console.log(res.status))
    .catch((error) => console.log(error.message));
}

export default handleModifyUserPost;
