const registerBtn = document.querySelector('.register-btn');

// input
const email = document.getElementById('email-input');
const password = document.getElementById('password-input');
const repeat = document.getElementById('repeat-input');
const nickname = document.getElementById('nickname-input');

// helper text
const emailHelper = document.getElementById('email-helper');
const passwordHelper = document.getElementById('password-helper');
const repeatHelper = document.getElementById('repeat-helper');
const nicknameHelper = document.getElementById('nickname-helper');

// 유효성 검사 패턴들
const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,20}$/;
const blankPattern = /[\s]/g;

email.addEventListener("input", emailValidCheck);
password.addEventListener("input", passwordValidCheck);
repeat.addEventListener("input", repeatValidCheck);
nickname.addEventListener("input", nicknameValidCheck);

email.addEventListener("input", validate);
password.addEventListener("input", validate);
repeat.addEventListener("input", validate);
nickname.addEventListener("input", validate);

email.addEventListener("focusout", validate);
password.addEventListener("focusout", validate);
repeat.addEventListener("focusout", validate);
nickname.addEventListener("focusout", validate);

function validate() {
    if (!emailValidCheck()) {
        registerBtn.disabled = true;
        registerBtn.classList.add("register-btn-disabled");
    } else if (!passwordValidCheck()) {
        registerBtn.disabled = true;
        registerBtn.classList.add("register-btn-disabled");
    } else if (!repeatValidCheck()) {
        console.log("1")
        registerBtn.disabled = true;
        registerBtn.classList.add("register-btn-disabled");
    } else if (!nicknameValidCheck()) {
        registerBtn.disabled = true;
        registerBtn.classList.add("register-btn-disabled");
    } else if (!(email.value && password.value && repeat.value && nickname.value)) {
        registerBtn.disabled = true;
        registerBtn.classList.add("register-btn-disabled");
    } else {
        registerBtn.disabled = false;
        registerBtn.classList.remove("register-btn-disabled");
    }

}

function emailValidCheck() {
    if (!email.value) {
        emailHelper.innerHTML = '* 이메일을 입력해주세요.';
        return false;
    } else if (emailPattern.test(email.value) == false) {
        emailHelper.innerHTML = '* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)';
        return false;
    }

    emailHelper.innerHTML = '';
    return true;
}

function passwordValidCheck() {
    if (!password.value) {
        passwordHelper.innerHTML = '* 비밀번호를 입력해주세요.';
        return false;
    } else if (passwordPattern.test(password.value) == false) {
        passwordHelper.innerHTML = '* 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        return false;
    } else if (repeat.value != password.value) {
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
    } else if (repeat.value != password.value) {
        repeatHelper.innerHTML = '* 비밀번호가 다릅니다.'
        return false;
    }
    
    repeatHelper.innerHTML = '';
    return true;
}

function nicknameValidCheck() {
    if (!nickname.value) {
        nicknameHelper.innerHTML = '* 닉네임을 입력해주세요.';
        return false;
    } else if (blankPattern.test(nickname.value) == true) {
        nicknameHelper.innerHTML = '* 띄어쓰기를 없애주세요.';
        return false;
    } else if (nickname.value.length > 10) {
        nicknameHelper.innerHTML = '* 닉네임은 최대 10자까지 가능합니다.';
        return false;
    }

    nicknameHelper.innerHTML = '';
    return true;
}