import { checkLoginStatus, logout } from './auth.js';

// 사용자 ID 가져오기
const getUserId = async () => {
    const userId = await checkLoginStatus();

    if (userId !== -1) {
        location.href="http://localhost:3000/article";
    }

    return userId;
};

const init = async () => {
    const userId = await getUserId();

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

    // 회원가입 버튼 클릭시
    const clickRegisterBtn = () => {
        const newMember = {
            email: email.value,
            password: password.value,
            nickname: nickname.value
        };

        fetch("http://localhost:8000/members", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMember)
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                res.json();
                location.href="http://localhost:3000/login";
            })
            .then(data => {
                console.log('Response from server:', data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    // 회원 가입 버튼 활성화/비활성화
    const validate = () => {
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

    // 이메일 유효성 검사
    const emailValidCheck = async () => {
        if (!email.value) {
            emailHelper.innerHTML = '* 이메일을 입력해주세요.';
            return false;
        } else if (emailPattern.test(email.value) == false) {
            emailHelper.innerHTML = '* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)';
            return false;
        } else if (!(await emailDuplicationCheck())) {
            emailHelper.innerHTML = '* 중복된 이메일 입니다.';
            return false;
        }

        emailHelper.innerHTML = '';
        return true;
    }

    // 비밀 번호 유효성 검사
    const passwordValidCheck = () => {
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

    // 비밀번호 확인 유효성 검사
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

    // 닉네임 유효성 검사
    const nicknameValidCheck = async () => {
        if (!nickname.value) {
            nicknameHelper.innerHTML = '* 닉네임을 입력해주세요.';
            return false;
        } else if (blankPattern.test(nickname.value) == true) {
            nicknameHelper.innerHTML = '* 띄어쓰기를 없애주세요.';
            return false;
        } else if (nickname.value.length > 10) {
            nicknameHelper.innerHTML = '* 닉네임은 최대 10자까지 가능합니다.';
            return false;
        } else if (!(await nicknameDuplicationCheck())) {
            nicknameHelper.innerHTML = '* 중복된 닉네임 입니다.';
            return false;
        }

        nicknameHelper.innerHTML = '';
        return true;
    }

    // 이메일 중복 체크
    const emailDuplicationCheck = async () => {
        try {
            const response = await fetch("http://localhost:8000/members/checkEmail", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email.value })
            });

            if (!response.ok) {
                if (response.status === 400) {
                    return false; // 중복된 이메일
                }
                throw new Error('Network response was not ok');
            }
            return true; // 사용 가능한 이메일
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return false; // 네트워크 오류 시 안전하게 처리
        }
    }

    // 닉네임 중복 체크
    const nicknameDuplicationCheck = async () => {
        try {
            const response = await fetch("http://localhost:8000/members/checkNickname", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nickname: nickname.value })
            });

            if (!response.ok) {
                if (response.status === 400) {
                    return false;
                }
                throw new Error('Network response was not ok');
            }
            return true;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return false;
        }

    }

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


    registerBtn.addEventListener("click", clickRegisterBtn);
}

// 초기화 함수 호출
init().catch(error => {
    console.error('Error during initialization:', error);
});