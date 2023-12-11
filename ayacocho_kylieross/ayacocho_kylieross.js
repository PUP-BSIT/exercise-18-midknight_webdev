let comments = [];

function leaveComment() {
    let nameInput = document.getElementById("name_comments");
    let comment = document.getElementById("comment_box");
    if (nameInput.value.length && comment.value.length) {
        document.getElementById("submit_button").disabled = false;
    } 
    else {
        document.getElementById("submit_button").disabled = true;
    }
}

function addNewComment() {
    let name = document.getElementById("name_comments").value;
    let commentText = document.getElementById("comment_box").value;

    if (name && commentText) {
        let commentSection = document.getElementById("comment_list");
        let newCommentItem = document.createElement("li");
        let timestamp = new Date();
        comments.push({ name, comment: commentText, timestamp });

        newCommentItem.innerHTML = `<strong>${name}</strong>
                                <p>${commentText}</p>
                                <span class="timestamp">${timestamp}</span>`;
        commentSection.appendChild(newCommentItem);

        document.getElementById("name_comments").value = "";
        document.getElementById("comment_box").value = "";

        document.getElementById("submit_button").disabled = true;
    }
}

function updateComments(order) {
    let commentSection = document.getElementById("comment_list");
    commentSection.innerHTML = '';

    if (order === 'asc') {
        comments.sort((a, b) => a.timestamp - b.timestamp);
    } 
    else if (order === 'desc') {
        comments.sort((a, b) => b.timestamp - a.timestamp);
    }

    for (const comment of comments) {
        let newCommentItem = document.createElement("li");
        newCommentItem.innerHTML = `<strong>${comment.name}</strong>
                        <p>${comment.comment}</p>
                        <span class="timestamp">${comment.timestamp}</span>`;
        commentSection.appendChild(newCommentItem);
    }
}

function sortComments(order) {
    updateComments(order);
}
