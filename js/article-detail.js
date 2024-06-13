const url = window.location.pathname;
const articleId = url.split('/').pop();

// 헤더 프로필
const dropdownBtn = document.querySelector(".header-profile-img");
const dropdownContent = document.querySelector(".dropdown-content");

// 게시글 관련 버튼
const articleEditBtn = document.getElementById('article-edit-btn');
const articleDeleteModalOpenButton = document.querySelector('#article-delete-btn');
const articleModalCancelButton = document.querySelector('#article-cancel-btn');
const articleModalCheckButton = document.querySelector('#article-check-btn');
const articleModal = document.querySelector('.article-modal');

// 댓글 관련 버튼
const commentRegisterButton = document.querySelector('.comment-register-btn');
const comment = document.getElementById('comment-input');

const commentCancelButton = document.querySelector('#comment-cancel-btn');
const commentCheckButton = document.querySelector('#comment-check-btn');
const commentModal = document.querySelector('.comment-modal');

const commentModifyButton = document.querySelector('.comment-modify-btn');
const commentModify = document.getElementById('comment-modify-input');

const commentRegisterBox = document.querySelector('.comment-register');
const commentModifyBox = document.querySelector('.comment-modify');

// 프로필 클릭시
dropdownBtn.addEventListener('click', () => {
    dropdownContent.classList.toggle('active');
})

// 게시글 데이터 가져오기
fetch("http://localhost:8000/articles/" + articleId)
    .then((res) => {
        
        if (!res.ok) {
            throw new Error('게시글을 가져오는 데 실패했습니다.');
        }
        return res.json();
    })
    .then((article) => {
        document.getElementById('article-title').innerHTML = `${article.title}`;
        document.getElementById('article-writer').innerHTML = `${article.nickname}`;
        document.getElementById('article-datetime').innerHTML = `${article.date_time}`;
        document.getElementById('article-content').innerHTML = `${article.content}`;
        document.getElementById('view-count').innerHTML = calculateNum(article.view_count);
        document.getElementById('comment-count').innerHTML = calculateNum(article.comment_count);
    })
    .catch((error) => {
        console.error('Error:', error.message);
        location.href="http://localhost:3000/404";
    });

// 댓글 목록 가져오기
fetch("http://localhost:8000/articles/" + articleId + "/comments")
    .then((res) => {
        if (!res.ok) {
            throw new Error('댓글 목록을 가져오는 데 실패했습니다.');
        }
        return res.json();
    })
    .then((comments) => {
        comments.forEach((comment) => {
            addCommentBox(comment);
        });
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });

// 댓글 박스 추가 
const addCommentBox = (comment) => {
    const temp = document.createElement("div");
    temp.innerHTML = `<div class="comment" data-id="${comment.id}">
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
                    <button class="comment-edit-btn small-btn" data-id="${comment.id}" type="button">수정</button>
                    <button class="comment-delete-btn small-btn" data-id="${comment.id}" type="button">삭제</button>
                </div>
            </div>
            <div id="comment-content">${comment.content}</div>
        </div>`;
    document.querySelector(".comment-list").append(temp);

    // 댓글 수정 버튼에 이벤트 추가
    const editButton = temp.querySelector('.comment-edit-btn');
    addCommentEditEvent(editButton, temp);

    // 댓글 삭제 버튼에 이벤트 추가
    const deleteButton = temp.querySelector('.comment-delete-btn');
    addCommentDeleteEvent(deleteButton);
}

const commentModifyValidate = () => {
    if (!commentModify.value) {
        commentModifyButton.disabled = true;
        commentModifyButton.classList.add("comment-modify-disable");
    } else {
        commentModifyButton.disabled = false;
        commentModifyButton.classList.remove("comment-modify-disable");
    }
}

// 댓글 수정 이벤트
const addCommentEditEvent = (button) => {
    button.addEventListener('click', () => {
        commentRegisterBox.classList.add('hidden');
        commentModifyBox.classList.remove('hidden');

        fetch("http://localhost:8000/articles/" + articleId + "/comments/" + button.dataset.id)
            .then((res) => {

                if (!res.ok) {
                    throw new Error('댓글을 가져오는 데 실패했습니다.');
                }
                return res.json();
            })
            .then((comment) => {
                commentModify.innerHTML = `${comment.content}`;
                commentModifyBox.setAttribute('data-id', comment.id);
            }
            )
            .catch((error) => {
                console.error('Error:', error.message);
            });
    });
}

// 댓글 삭제 이벤트
const addCommentDeleteEvent = (button) => {
    button.addEventListener('click', (e) => {
        const target = e.target.closest('.comment');

        commentModal.classList.remove('hidden');
        
        // 댓글 모달창 이벤트
        commentCancelButton.addEventListener('click', () => {
            commentModal.classList.add('hidden');
        });

        commentCheckButton.addEventListener('click', () => {
            fetch("http://localhost:8000/articles/" + articleId + "/comments/" + button.dataset.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                commentModal.classList.add('hidden');
                
                // 해당 댓글 지우기
                target.remove();

                res.json();
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        });
    });
}

// 댓글 등록 이벤트
const commentRegisterValidate = () => {
    if (!comment.value) {
        commentRegisterButton.disabled = true;
        commentRegisterButton.classList.add("comment-register-disable");
    } else {
        commentRegisterButton.disabled = false;
        commentRegisterButton.classList.remove("comment-register-disable");
    }
}

comment.addEventListener('input', commentRegisterValidate);

commentRegisterButton.addEventListener('click', (e) => {
    if (comment.value) {
        const newComment = { content: comment.value };

        fetch("http://localhost:8000/articles/" + articleId + "/comments", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            resetCommentRegister();

            return res.json();

        })
        .then((data) => {
            // 해당 등록된 댓글 보여주기
            addCommentBox(data.data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
});

// 댓글 수정 후 이벤트
commentModify.addEventListener('input', commentModifyValidate);

commentModifyButton.addEventListener('click', () => {

    if (commentModify.value) {

        const editComment = { content: commentModify.value };

        fetch("http://localhost:8000/articles/" + articleId + "/comments/" + commentModifyBox.getAttribute('data-id'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editComment)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            commentRegisterBox.classList.remove('hidden');
            commentModifyBox.classList.add('hidden');


            const commentElement = document.querySelector(`.comment[data-id="${commentModifyBox.getAttribute('data-id')}"]`);
            if (commentElement) {
                console.log(commentElement);
                commentElement.querySelector('#comment-content').innerHTML = commentModify.value;
            }

            return res.json();
        })
        .then(data => {
            console.log('Response from server:', data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
})

// 게시글 모달창 이벤트
articleDeleteModalOpenButton.addEventListener('click', () => {
    articleModal.classList.remove('hidden');
});

articleModalCancelButton.addEventListener('click', () => {
    articleModal.classList.add('hidden');
});

articleModalCheckButton.addEventListener('click', () => {
    articleModal.classList.add('hidden');

    fetch("http://localhost:8000/articles/" + articleId, {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        res.json();
        location.href="http://localhost:3000/article";
    })
    .then(data => {
        console.log('Response from server:', data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});

// 게시글 수정 버튼 이벤트
articleEditBtn.addEventListener('click', () => {
    window.location.href = window.location.href + "/edit";
})

// 댓글 등록 박스 초기화
const resetCommentRegister = () => {
    comment.value = '';
    commentRegisterButton.disabled = true;
    commentRegisterButton.classList.add("comment-register-disable");
}

// 댓글 수정 박스 초기화
const resetCommentModify = () => {
    commentModify.innerHTML = '';
}

const calculateNum = num => {
    if (num < 1000) {
        return num;
    } else if (num >= 1000 && num < 10000) {
        return "1k";
    } else if (num >= 10000 && num < 100000) {
        return "10k";
    }
    return "100k";
};