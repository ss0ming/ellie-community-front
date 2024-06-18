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

    const url = window.location.pathname;
    const articleId = url.substring(0, url.length-5).split('/').pop();

    // 헤더 프로필
    const dropdownBtn = document.querySelector(".header-profile-img");
    const dropdownContent = document.querySelector(".dropdown-content");
    const logoutBtn = document.querySelector(".logout-btn");
    const arrowBtn = document.querySelector(".arrow-back");

    // 뒤로가기 버튼 클릭 이벤트
    arrowBtn.addEventListener('click', () => {
        location.href=`http://localhost:3000/article/${articleId}`;
    })

    // 프로필 클릭시
    dropdownBtn.addEventListener('click', () => {
        dropdownContent.classList.toggle('active');
    })

    // 로그아웃 클릭 이벤트
    logoutBtn.addEventListener('click', async () => {
        await logout();
    })

    const editBtn = document.querySelector('.edit-btn');

    const title = document.getElementById('title-input');
    const content = document.getElementById('content-input');

    const helperText = document.getElementById('helper-text');

    const clickEditBtn = () => {
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

    const validate = () => {
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
}

// 초기화 함수 호출
init().catch(error => {
    console.error('Error during initialization:', error);
});