const url = window.location.pathname;
const articleId = url.split('/').pop();

const articleDeleteModalOpenButton = document.querySelector('#article-delete-btn');
const articleModalCloseButton = document.querySelector('#article-cancel-btn');
const articleModalCloseButton2 = document.querySelector('#article-check-btn');
const articleModal = document.querySelector('.article-modal');

fetch("/article.json")
    .then((res) => res.json())
    .then((articles) => {
        articles.forEach((article) => {
            if (article.id == articleId) {
                document.getElementById('article-title').innerHTML = `${article.title}`;
                document.getElementById('article-writer').innerHTML = `${article.nickname}`;
                document.getElementById('article-datetime').innerHTML = `${article.date_time}`;
                document.getElementById('view-count').innerHTML = calculateNum(article.view_count);
                document.getElementById('comment-count').innerHTML = calculateNum(article.comment_count);
            }
        });
    });

fetch("/article_comment.json")
    .then((res) => res.json())
    .then((articles) => {
        articles.forEach((comment) => {
            const temp = document.createElement("div");
            temp.innerHTML = `<div class="comment">
                <div class="comment-wrap-top">
                    <div class="comment-info">
                        <div class="comment-wrtier">
                            <div class="profile-img"></div>
                            <div class="writer-info">
                                <p id="comment-writer" class="writer">${comment.nickname}</p>
                                <p id="comment-datetime" class="datetime">${comment.date_time}</p>
                            </div>
                        </div>
                    </div>
                    <div class="btns">
                        <button class="small-btn" type="button">수정</button>
                        <button class="comment-delete-btn small-btn" type="button">삭제</button>
                    </div>
                </div>
                <div id="comment-content">${comment.content}</div>
            </div>`
            document.querySelector(".comment-list").append(temp);
        });
        const deletebuttons = document.querySelectorAll('.comment-delete-btn');
        deletebuttons.forEach((button) => {
            button.addEventListener('click', () => {
                commentModal.classList.remove('hidden');
            })
        });
    });

function calculateNum(num) {
    if (num < 1000) {
        return num;
    } else if (num >= 1000 && num <10000) {
        return "1k";
    } else if (num >= 10000 && num <100000) {
        return "10k";
    }
    return "100k";
}

const commentModalCloseButton = document.querySelector('#comment-cancel-btn');
const commentModalCloseButton2 = document.querySelector('#comment-check-btn');
const commentModal = document.querySelector('.comment-modal');

articleDeleteModalOpenButton.addEventListener('click', () => {
    articleModal.classList.remove('hidden');
});

articleModalCloseButton.addEventListener('click', () => {
    articleModal.classList.add('hidden');
});

articleModalCloseButton2.addEventListener('click', () => {
    articleModal.classList.add('hidden');
});

commentModalCloseButton.addEventListener('click', () => {
    commentModal.classList.add('hidden');
});

commentModalCloseButton2.addEventListener('click', () => {
    commentModal.classList.add('hidden');
});