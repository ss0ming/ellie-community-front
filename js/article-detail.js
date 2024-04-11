const articleDeleteModalOpenButton = document.querySelector('#article-delete-btn');
const articleModalCloseButton = document.querySelector('#article-cancel-btn');
const articleModalCloseButton2 = document.querySelector('#article-check-btn');
const articleModal = document.querySelector('.article-modal');

const commentDeleteModalOpenButton = document.querySelector('#comment-delete-btn');
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

commentDeleteModalOpenButton.addEventListener('click', () => {
    commentModal.classList.remove('hidden');
});

commentModalCloseButton.addEventListener('click', () => {
    commentModal.classList.add('hidden');
});

commentModalCloseButton2.addEventListener('click', () => {
    commentModal.classList.add('hidden');
});