document.addEventListener("DOMContentLoaded", () => {
    const userNameInput = document.getElementById('user_name');
    const userCommentInput = document.getElementById('user_comment');
    const commentButton = document.getElementById('comment_button');
    const commentList = document.getElementById('comment_list');
    const commentsArray = [];

    commentButton.addEventListener('click', () => {
        const userName = userNameInput.value.trim();
        const userComment = userCommentInput.value.trim();
        const timestamp = new Date();

        if (userName && userComment) {
            const comment = {
                userName,
                userComment,
                timestamp
            };

            commentsArray.push(comment);

            updateCommentList();
            userNameInput.value = '';
            userCommentInput.value = '';
        }
    });

    function updateCommentList() {
        const displayLatest = 
            document.getElementById('display_latest').checked;

        commentsArray.sort((a, b) => displayLatest ? b.timestamp - a.timestamp
            : a.timestamp - b.timestamp);

        commentList.innerHTML = '';

        commentsArray.forEach(comment => {
            const listComment = document.createElement('li');
            listComment.innerHTML = `${comment.userName}
                <p>${comment.userComment}</p>`;

            commentList.append(listComment);
        });
    }

    document.getElementById('display_latest').addEventListener
        ('change', updateCommentList);
});
