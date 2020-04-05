import axios from "axios";
import Comment from "../../models/Comment";

const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commentDelete = document.getElementById("jsCommentDelete");

const deleteComment = (event) => {
  const deleteBtn = event.target;
  const li = deleteBtn.parentNode;
  commentList.removeChild(li);
  commentNumber.innerHTML = `${
    parseInt(commentNumber.innerHTML, 10) - 1
  } comments`;
};

const handleClick = async (event) => {
  const videoID = window.location.href.split("/videos/")[1];
  const commentID = event.target.parentNode.id;
  const response = await axios({
    url: `/api/${videoID}/${commentID}/remove-comment`,
    method: "POST",
  });
  if (response.status === 200) {
    deleteComment(event);
  }
};

function init() {
  commentDelete.addEventListener("click", handleClick);
}

if (commentDelete) {
  init();
}
