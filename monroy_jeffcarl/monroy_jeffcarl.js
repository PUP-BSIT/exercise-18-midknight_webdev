document.addEventListener("DOMContentLoaded", function () {
  let addButton = document.querySelector("#add_button");
  let fullNameInput = document.querySelector("#full_name");
  let commentInput = document.querySelector("#comment");

  let commentsArray = [];

  addButton.addEventListener("click", addComment);

  fullNameInput.addEventListener("input", enableCommentButton);
  commentInput.addEventListener("input", enableCommentButton);

  document.querySelector("#button_asc").addEventListener
    ("click", sortCommentsAscending);
  document.querySelector("#button_desc").addEventListener
    ("click", sortCommentsDescending);

  function enableCommentButton() {
    let addButton = document.querySelector("#add_button");
    addButton.disabled = fullNameInput.value.trim() === "" ||
      commentInput.value.trim() === "";
  }

  function addComment() {
    let fullNameInput = document.querySelector("#full_name");
    let commentInput = document.querySelector("#comment");

    let fullName = fullNameInput.value;
    let comment = commentInput.value;

    let currentDate = new Date();

    let newComment = {
      fullName: fullName,
      comment: comment,
      date: currentDate
    };

    commentsArray.push(newComment);

    renderComments();

    fullNameInput.value = "";
    commentInput.value = "";
    enableCommentButton();
  }

  // asc 
  function sortCommentsAscending() {
    commentsArray.sort((a, b) => a.date - b.date);
    renderComments();
  }

  // desc 
  function sortCommentsDescending() {
    commentsArray.sort((a, b) => b.date - a.date);
    renderComments();
  }

  function renderComments() {
    let itemList = document.querySelector("#comment_list");
    itemList.innerHTML = "";

    commentsArray.forEach(comment => {
      let listItem = document.createElement("li");
      listItem.textContent = comment.fullName;

      let commentText = document.createElement("p");
      commentText.textContent = comment.comment;

      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        commentsArray = commentsArray.filter(c => c !== comment);
        renderComments();
      });

      listItem.appendChild(commentText);
      listItem.appendChild(deleteButton);
      itemList.appendChild(listItem);
    });
  }
});
