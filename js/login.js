const loginBtn = document.querySelector('.login-btn');
const email = document.getElementById('email-input');
const password = document.getElementById('password-input');
const helperText = document.getElementById('helper');

const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,20}$/;

email.addEventListener("input", validate);
password.addEventListener("input", validate);

function validate() {    
    if (!makeHelperMessage(email.value, password.value)) {
        loginBtn.disabled = true;
        loginBtn.classList.add("login-btn-disabled");
    } else if (!(email.value && password.value)) {
        loginBtn.disabled = true;
        loginBtn.classList.add("login-btn-disabled"); 
    } else {
        console.log("3");
        loginBtn.disabled = false;
        loginBtn.classList.remove("login-btn-disabled");
    }
}

function makeHelperMessage(email, password) {
    if (!emailValidCheck(email)) {
        helperText.innerHTML = '* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)';
        return false;
    } else if (!password) {
        helperText.innerHTML = '* 비밀번호를 입력해주세요.';
        return false;
    } else if (!passwordValidCheck(password)) {
        helperText.innerHTML = '* 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        return false;
    } 

    helperText.innerHTML = '';
    return true;
}

function emailValidCheck(email) {
    if (emailPattern.test(email) == false) {
        return false;
    }
    return true;
}

function passwordValidCheck(password) {
    if (passwordPattern.test(password) == false) {
        return false;
    }
    return true;
}
