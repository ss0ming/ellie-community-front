const modifyBtn = document.querySelector('.modify-btn');
const toastMessage = document.getElementById('toast-message');

const password = document.getElementById('password-input');
const repeat = document.getElementById('repeat-input');

const passwordHelper = document.getElementById('password-helper');
const repeatHelper = document.getElementById('repeat-helper');

const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,20}$/;

password.addEventListener("input", passwordValidCheck);
repeat.addEventListener("input", repeatValidCheck);

password.addEventListener("input", validate);
repeat.addEventListener("input", validate);

function validate() {
    if (!(password.value && repeat.value)) {
        modifyBtn.disabled = true;
        modifyBtn.classList.add("modify-btn-disabled");
    } else if (!passwordValidCheck()) {
        modifyBtn.disabled = true;
        modifyBtn.classList.add("modify-btn-disabled");
    } else if (!repeatValidCheck()) {
        modifyBtn.disabled = true;
        modifyBtn.classList.add("modify-btn-disabled");
    } else {
        modifyBtn.disabled = false;
        modifyBtn.classList.remove("modify-btn-disabled");
    }
    
}

function passwordValidCheck() {
    if (!password.value) {
        passwordHelper.innerHTML = '* 비밀번호를 입력해주세요.';
        return false;
    } else if (passwordPattern.test(password.value) == false) {
        passwordHelper.innerHTML = '* 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        return false;
    } else if (!comparePassword()) {
        passwordHelper.innerHTML = '* 비밀번호가 다릅니다.'
        return false;
    }

    passwordHelper.innerHTML = '';
    return true;
}

function repeatValidCheck() {
    if (!repeat.value) {
        repeatHelper.innerHTML = '* 비밀번호를 입력해주세요.'
        return false;
    } else if (!comparePassword()) {
        repeatHelper.innerHTML = '* 비밀번호가 다릅니다.'
        return false;
    }
    
    repeatHelper.innerHTML = '';
    return true;
}

function comparePassword() {
    if (repeat.value != password.value) {
        return false;
    }
    return true;
}

modifyBtn.addEventListener('click', () => {
    toastMessage.classList.add('active');
    setTimeout(function() {
        toastMessage.classList.remove('active');
    }, 1000) ;
})