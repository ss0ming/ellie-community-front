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

    const registerBtn = document.querySelector('.register-btn');

    const title = document.getElementById('title-input');
    const content = document.getElementById('content-input');

    const helperText = document.getElementById('helper-text');

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

    title.addEventListener("input", validate);
    content.addEventListener("input", validate);

    registerBtn.addEventListener("click", clickRegisterBtn);
}

// 초기화 함수 호출
init().catch(error => {
    console.error('Error during initialization:', error);
});