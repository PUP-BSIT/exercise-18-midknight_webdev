let commentsArray = [];

function commentButton() {
    let nameInput = document.getElementById("name_input");
    let commentInput = document.getElementById("comment_input");
    let commentButton = document.getElementById("comment_button");

    let name = nameInput.value;
    let comment = commentInput.value;
    let timestamp = new Date().getTime(); 

    let commentObject = {
        name: name,
        comment: comment,
        timestamp: timestamp
    };

    commentsArray.push(commentObject);

    nameInput.value = "";
    commentInput.value = "";

    updateCommentList();
    commentButton.disabled = true;
}

function checkInput() {
    let nameInput = document.getElementById("name_input");
    let commentInput = document.getElementById("comment_input");
    let commentButton = document.getElementById("comment_button");

    let nameValue = nameInput.value.trim();
    let commentValue = commentInput.value.trim();

    if (nameValue.length && commentValue.length) {
        commentButton.disabled = false;
    } else {
        commentButton.disabled = true;
    }
}

function updateCommentList() {
    const commentSection = 
        document.getElementById("comment_section");
    const newCommentsContainer = 
        document.getElementById('new_comments_container');
    const displayLatest = 
        document.getElementById('display_latest').checked;

    commentsArray.sort((a, b) => (displayLatest ? b.timestamp - 
        a.timestamp : a.timestamp - b.timestamp));

    const fragment = document.createDocumentFragment();

    commentsArray.forEach(commentObject => {
        const listItem = document.createElement('div');
        listItem.classList.add('new-comment');

        const nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.textContent = commentObject.name;

        const commentElement = document.createElement('div');
        commentElement.classList.add('comment-text');
        const postingDate = new Date(commentObject.timestamp)
            .toLocaleDateString();
        commentElement.textContent = `${commentObject.comment} 
            (Posted on: ${postingDate})`;

        listItem.appendChild(nameElement);
        listItem.appendChild(commentElement);
        fragment.appendChild(listItem);
    });

    newCommentsContainer.innerHTML = '';
    newCommentsContainer.appendChild(fragment);
}

document.getElementById('display_latest')
    .addEventListener('change', updateCommentList); 
    