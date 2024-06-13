const registerBtn = document.querySelector('.register-btn');

const title = document.getElementById('title-input');
const content = document.getElementById('content-input');

const helperText = document.getElementById('helper-text');

title.addEventListener("input", validate);
content.addEventListener("input", validate);

registerBtn.addEventListener("click", clickRegisterBtn);

const clickRegisterBtn = () => {
    if (!validate()) {
        helperText.innerHTML = '* 제목, 내용을 모두 작성해주세요';
    } else {
        helperText.innerHTML ='';

        const newArticle = {
            title: title.value,
            content: content.value
        };

        fetch("http://localhost:8000/articles", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newArticle)
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

const validate = () => {
    if (!(title.value && content.value)) {
        registerBtn.disabled = false;
        registerBtn.classList.remove("register-btn-disable");
        return false;
    } else {
        registerBtn.disabled = false;
        registerBtn.classList.remove("register-btn-disable");
        return true;
    }
}