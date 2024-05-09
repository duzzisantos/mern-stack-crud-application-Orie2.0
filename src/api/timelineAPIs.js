import axios from "axios";

function handleSaveComment(secondParty, id, replyContent, user) {
  axios
    .post(
      `http://localhost:8080/api/user-posts/reply?clientUID=${secondParty}&id=${id}`,
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

function handleSaveBookmark(secondParty, id, setBookmark) {
  axios
    .post(
      `http://localhost:8080/api/user-posts/save-bookmark?clientUID=${secondParty}&id=${id}`,
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

function handleLikePost(secondParty, id, user, setLike) {
  axios
    .post(
      `http://localhost:8080/api/user-posts/like-post?clientUID=${secondParty}&id=${id}`,
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

function handleUnlikePost(secondParty, id, user, setLike) {
  axios
    .post(
      `http://localhost:8080/api/user-posts/unlike-post?clientUID=${secondParty}&id=${id}`,
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

function handleSendReport(id, user, secondParty) {
  axios
    .post(
      `http://localhost:8080/api/report-logs?clientUID=${secondParty}&id=${id}&reportedBy=${user.uid}`
    )
    .then((res) => {
      console.log(res.status);
    })
    .catch((err) => console.warn(err.message));
}

function handleRemoveUser(user, secondParty) {
  axios
    .post(
      `http://localhost:8080/api/followers/block?clientUID=${user.uid}&secondParty=${secondParty}`
    )
    .then((res) => {
      console.log(res.statusText);
    })
    .catch((err) => console.warn(err.message));
}

function handleUnfollow(user, secondParty) {
  axios
    .post(
      `http://localhost:8080/api/followers/unfollow-user?clientUID=${user.uid}&secondParty=${secondParty}`
    )
    .then((res) => {
      console.log(res.statusText);
    })
    .catch((err) => console.warn(err.message));
}

function handleFollow(user, secondParty) {
  axios
    .post(
      `http://localhost:8080/api/followers/follow-user?clientUID=${user.uid}&secondParty=${secondParty}`
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
