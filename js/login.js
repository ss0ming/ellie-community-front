const loginBtn = document.querySelector('.login-btn');
const email = document.getElementById('email-input');
const password = document.getElementById('password-input');
const helperText = document.getElementById('helper');

const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,20}$/;

const clickLoginBtn = () => {
    const login = {
        email: email.value,
        password: password.value
    };

    fetch("http://localhost:8000/members/login", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        if (res.status == 200) {
            location.href="http://localhost:3000/article";
        }
        return res.json();
    })
    .then(data => {
        console.log('Response from server:', data);
        const userString = JSON.stringify(data);
        window.localStorage.setItem("user", userString);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        helperText.innerHTML = '* 아이디 및 비밀번호를 확인해주세요.';
    });
}

const validate = () => {
    if (!makeHelperMessage(email.value, password.value)) {
        loginBtn.disabled = true;
        loginBtn.classList.add("login-btn-disabled");
    } else if (!(email.value && password.value)) {
        loginBtn.disabled = true;
        loginBtn.classList.add("login-btn-disabled"); 
    } else {
        loginBtn.disabled = false;
        loginBtn.classList.remove("login-btn-disabled");
    }
}

const makeHelperMessage = (email, password) => {
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

const emailValidCheck = (email) => {
    if (emailPattern.test(email) == false) {
        return false;
    }
    return true;
}

const passwordValidCheck = (password) => {
    if (passwordPattern.test(password) == false) {
        return false;
    }
    return true;
}

email.addEventListener("input", validate);
password.addEventListener("input", validate);

loginBtn.addEventListener("click", clickLoginBtn);