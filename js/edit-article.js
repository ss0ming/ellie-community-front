const url = window.location.pathname;
const articleId = url.substring(0, url.length-5).split('/').pop();

const editBtn = document.querySelector('.edit-btn');

const title = document.getElementById('title-input');
const content = document.getElementById('content-input');

const helperText = document.getElementById('helper-text');

title.addEventListener("input", validate);
content.addEventListener("input", validate);

editBtn.addEventListener("click", clickEditBtn);

console.log(articleId);

fetch("http://localhost:8000/articles/" + articleId)
    .then((res) => res.json())
    .then((article) => {
        title.value = article.title;
        content.value = article.content;
    });


function clickEditBtn() {
    if (!validate()) {
        helperText.innerHTML = '* 제목, 내용을 모두 작성해주세요';
    } else {
        helperText.innerHTML ='';

        const editArticle = {
            title: title.value,
            content: content.value
        }

        fetch("http://localhost:8000/articles/" + articleId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editArticle)
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
    }
}

function validate() {
    if (!(title.value && content.value)) {
        editBtn.disabled = false;
        editBtn.classList.remove("edit-btn-disable");
        return false;
    } else {
        editBtn.disabled = false;
        editBtn.classList.remove("edit-btn-disable");
        return true;
    }
}