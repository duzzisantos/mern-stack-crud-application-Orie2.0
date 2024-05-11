import axios from "axios";
import { getHost } from "../helpers/getHost";

function handleSaveComment(secondParty, id, replyContent, user, token) {
  axios
    .post(
      `${getHost()}/api/user-posts/reply?userEmail=${secondParty}&id=${id}`,
      {
        commentBody: replyContent,
        commentDate: `${new Date(Date.now()).toDateString()}`,
        commentBy: user.email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log(res.status);
    })
    .catch((error) => console.log(error.message));
}

function handleSaveBookmark(secondParty, id, setBookmark, token) {
  axios
    .post(
      `${getHost()}/api/user-posts/save-bookmark?userEmail=${secondParty}&id=${id}`,
      {
        isBookmarked: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log(res.status);
      setBookmark(true);
    })
    .catch((error) => console.log(error.message));
}

function handleLikePost(secondParty, id, user, setLike, token) {
  axios
    .post(
      `${getHost()}/api/user-posts/like-post?userEmail=${secondParty}&id=${id}`,
      {
        dateLiked: `${new Date(Date.now()).toDateString()}`,
        likedUserName: user.email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log(res.status);
      setLike(true);
    })
    .catch((error) => console.log(error.message));
}

function handleUnlikePost(secondParty, id, user, setLike, token) {
  axios
    .post(
      `${getHost()}/api/user-posts/unlike-post?userEmail=${secondParty}&id=${id}`,
      {
        dateLiked: `${new Date(Date.now()).toDateString()}`,
        likedUserName: user.email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log(res.status);
      setLike(false);
    })
    .catch((error) => console.log(error.message));
}

function handleSendReport(id, user, secondParty, token) {
  axios
    .post(
      `${getHost()}/api/report-logs?userEmail=${secondParty}&id=${id}&reportedBy=${
        user.uid
      }`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((res) => {
      console.log(res.status);
    })
    .catch((err) => console.warn(err.message));
}

function handleRemoveUser(user, secondParty, token) {
  axios
    .post(
      `${getHost()}/api/followers/block`,
      {
        userEmail: user.email,
        secondParty: secondParty,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log(res.statusText);
    })
    .catch((err) => console.warn(err.message));
}

function handleUnfollow(user, secondParty, token) {
  axios
    .post(
      `${getHost()}/api/followers/unfollow-user`,
      {
        userEmail: user.email,
        secondParty: secondParty,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log(res.statusText);
    })
    .catch((err) => console.warn(err.message));
}

function handleFollow(user, secondParty, secondPartyEmail, token) {
  axios
    .post(
      `${getHost()}/api/followers/follow-user`,
      {
        userEmail: user.email,
        clientUID: user.uid,
        secondParty,
        secondPartyEmail,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
