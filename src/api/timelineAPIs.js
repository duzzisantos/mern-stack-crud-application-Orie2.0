import axios from "axios";
import { getHost } from "../helpers/getHost";

function handleSaveComment(secondParty, id, replyContent, user) {
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
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: false,
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
      `${getHost()}/api/user-posts/save-bookmark?userEmail=${secondParty}&id=${id}`,
      {
        isBookmarked: true,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: false,
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
      `${getHost()}/api/user-posts/like-post?userEmail=${secondParty}&id=${id}`,
      {
        dateLiked: `${new Date(Date.now()).toDateString()}`,
        likedUserName: user.email,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: false,
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
      `${getHost()}/api/user-posts/unlike-post?userEmail=${secondParty}&id=${id}`,
      {
        dateLiked: `${new Date(Date.now()).toDateString()}`,
        likedUserName: user.email,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: false,
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
      `${getHost()}/api/report-logs?userEmail=${secondParty}&id=${id}&reportedBy=${
        user.uid
      }`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }
    )
    .then((res) => {
      console.log(res.status);
    })
    .catch((err) => console.warn(err.message));
}

function handleRemoveUser(user, secondParty) {
  axios
    .post(
      `${getHost()}/api/followers/block`,
      {
        userEmail: user.email,
        secondParty: secondParty,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }
    )
    .then((res) => {
      console.log(res.statusText);
    })
    .catch((err) => console.warn(err.message));
}

function handleUnfollow(user, secondParty) {
  axios
    .post(
      `${getHost()}/api/followers/unfollow-user`,
      {
        userEmail: user.email,
        secondParty: secondParty,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }
    )
    .then((res) => {
      console.log(res.statusText);
    })
    .catch((err) => console.warn(err.message));
}

function handleFollow(user, secondParty, secondPartyEmail) {
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
          Accept: "application/json",
          "Content-Type": "application/json",
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
