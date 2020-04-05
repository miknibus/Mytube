import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const addComment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  span.innerHTML = comment;
  button.innerText = "X";
  li.appendChild(span);
  li.appendChild(button);
  commentList.prepend(li);
  commentNumber.innerHTML = `${
    parseInt(commentNumber.innerHTML, 10) + 1
  } comments`;
};

const sendComment = async (comment) => {
  const videoID = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoID}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
