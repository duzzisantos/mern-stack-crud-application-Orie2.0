import axios from "axios";

function handleSaveComment(authorEmail, id, replyContent, user) {
  axios
    .post(
      `http://localhost:8080/api/user-posts/reply?userEmail=${authorEmail}&id=${id}`,
      {
        commentBody: replyContent,
        commentDate: `${new Date(Date.now()).toDateString()}`,
        commentBy: user.email,
      }
    )
    .then((res) => {
      console.log(res.status);
    })
    .catch((error) => console.log(error.message));
}

function handleSaveBookmark(authorEmail, id, setBookmark) {
  axios
    .post(
      `http://localhost:8080/api/user-posts/save-bookmark?userEmail=${authorEmail}&id=${id}`,
      {
        isBookmarked: true,
      }
    )
    .then((res) => {
      console.log(res.status);
      setBookmark(true);
    })
    .catch((error) => console.log(error.message));
}

function handleLikePost(authorEmail, id, user, setLike) {
  axios
    .post(
      `http://localhost:8080/api/user-posts/like-post?userEmail=${authorEmail}&id=${id}`,
      {
        dateLiked: `${new Date(Date.now()).toDateString()}`,
        likedUserName: user.email,
      }
    )
    .then((res) => {
      console.log(res.status);
      setLike(true);
    })
    .catch((error) => console.log(error.message));
}

function handleUnlikePost(authorEmail, id, user, setLike) {
  axios
    .post(
      `http://localhost:8080/api/user-posts/unlike-post?userEmail=${authorEmail}&id=${id}`,
      {
        dateLiked: `${new Date(Date.now()).toDateString()}`,
        likedUserName: user.email,
      }
    )
    .then((res) => {
      console.log(res.status);
      setLike(false);
    })
    .catch((error) => console.log(error.message));
}

function handleSendReport(authorEmail, id, user) {
  axios
    .post(
      `http://localhost:8080/api/report-logs?userEmail=${authorEmail}&id=${id}&reportedBy=${user.email}`
    )
    .then((res) => {
      console.log(res.status);
    })
    .catch((err) => console.warn(err.message));
}

function handleRemoveUser(user, secondParty) {
  axios
    .post(
      `http://localhost:8080/api/followers/block?currentUser=${user.email}&secondParty=${secondParty}`
    )
    .then((res) => {
      console.log(res.statusText);
    })
    .catch((err) => console.warn(err.message));
}

function handleUnfollow(user, secondParty) {
  axios
    .post(
      `http://localhost:8080/api/followers/unfollow-user?currentUser=${user.email}&secondParty=${secondParty}`
    )
    .then((res) => {
      console.log(res.statusText);
    })
    .catch((err) => console.warn(err.message));
}

function handleFollow(user, secondParty) {
  axios
    .post(
      `http://localhost:8080/api/followers/follow-user?currentUser=${user.uid}&secondParty=${secondParty}`
    )
    .then((res) => console.log(res.statusText))
    .catch((err) => console.warn(err.message));
}

export {
  handleLikePost,
  handleRemoveUser,
  handleSaveBookmark,
  handleSaveComment,
  handleSendReport,
  handleUnlikePost,
  handleUnfollow,
  handleFollow,
};
