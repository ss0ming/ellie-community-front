import { checkLoginStatus, logout } from './auth.js';

// 사용자 ID 가져오기
const getUserId = async () => {
    const userId = await checkLoginStatus();

    if (userId == -1) {
        location.href="http://localhost:3000/login";
    }

    return userId;
};

const init = async () => {
    const userId = await getUserId();

    const modifyBtn = document.querySelector('.modify-btn');
    const toastMessage = document.getElementById('toast-message');

    const password = document.getElementById('password-input');
    const repeat = document.getElementById('repeat-input');

    const passwordHelper = document.getElementById('password-helper');
    const repeatHelper = document.getElementById('repeat-helper');

    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,20}$/;

    // 헤더 프로필
    const dropdownBtn = document.querySelector(".header-profile-img");
    const dropdownContent = document.querySelector(".dropdown-content");
    const logoutBtn = document.querySelector(".logout-btn");
    const arrowBtn = document.querySelector(".arrow-back");

    // 뒤로가기 버튼 클릭 이벤트
    arrowBtn.addEventListener('click', () => {
        location.href=`http://localhost:3000/article`;
    })

    // 프로필 클릭시
    dropdownBtn.addEventListener('click', () => {
        dropdownContent.classList.toggle('active');
    })

    // 로그아웃 클릭 이벤트
    logoutBtn.addEventListener('click', async () => {
        await logout();
    })

    const validate = () => {
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

    const passwordValidCheck = () => {
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

    const repeatValidCheck = () => {
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

    const comparePassword = () => {
        if (repeat.value != password.value) {
            return false;
        }
        return true;
    }

    password.addEventListener("input", passwordValidCheck);
    repeat.addEventListener("input", repeatValidCheck);

    password.addEventListener("input", validate);
    repeat.addEventListener("input", validate);

    modifyBtn.addEventListener('click', () => {
        toastMessage.classList.add('active');
        setTimeout(function() {
            toastMessage.classList.remove('active');
        }, 1000) ;
    })
}

// 초기화 함수 호출
init().catch(error => {
    console.error('Error during initialization:', error);
});