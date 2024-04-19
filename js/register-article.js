const registerBtn = document.querySelector('.register-btn');

const title = document.getElementById('title-input');
const content = document.getElementById('content-input');

const helperText = document.getElementById('helper-text');

title.addEventListener("input", validate);
content.addEventListener("input", validate);

registerBtn.addEventListener("click", clickRegisterBtn);

function clickRegisterBtn() {
    if (!validate()) {
        helperText.innerHTML = '* 제목, 내용을 모두 작성해주세요';
    } else {
        helperText.innerHTML ='';
    }
}

function validate() {
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