import { checkLoginStatus, logout } from './auth.js';

// 사용자 ID 가져오기
const getUserId = async () => {
    const userId = await checkLoginStatus();
    return userId;
};

const init = async () => {
    const userId = await getUserId();

    // 헤더 프로필
    const dropdownBtn = document.querySelector(".header-profile-img");
    const dropdownContent = document.querySelector(".dropdown-content");
    const loginBtn = document.querySelector(".login-btn");
    const logoutBtn = document.querySelector(".logout-btn");

    if (userId !== -1) {
        loginBtn.classList.add('hidden');
        dropdownBtn.classList.remove('hidden');
    } else {
        loginBtn.classList.remove('hidden');
        dropdownBtn.classList.add('hidden');
    }

    // 프로필 클릭시
    dropdownBtn.addEventListener('click', () => {
        dropdownContent.classList.toggle('active');
    })

    // 로그아웃 클릭 이벤트
    logoutBtn.addEventListener('click', async () => {
        await logout();
    })

    fetch("http://localhost:8000/articles")
        .then((res) => res.json())
        .then((articles) => {
            articles.forEach((article) => {
                const temp = document.createElement("div");
                temp.innerHTML = `<div class="list" onclick="location.href='/article/${article.id}'">
                        <div class="list-top">
                            <h2>${article.title}</h2>
                            <div class="list-info">
                                <p>좋아요 ${calculateNum(article.likes)}  댓글 ${calculateNum(article.comment_count)}  조회수 ${calculateNum(article.view_count)}</p>
                                <div class="datetime"><p>${article.created_at}</p></div>
                            </div>
                        </div>
                        <hr>
                        <div class="list-bottom">
                            <div class="profile">
                                <div class="profile-img"></div>
                                <p>${article.nickname}</p>
                            </div>
                        </div> 
                    </div>`
                    document.querySelector(".content").append(temp);
            });
        });

    const calculateNum = num => {
        if (num < 1000) {
            return num;
        } else if (num >= 1000 && num <10000) {
            return "1k";
        } else if (num >= 10000 && num <100000) {
            return "10k";
        }
        return "100k";
    }
}

// 초기화 함수 호출
init().catch(error => {
    console.error('Error during initialization:', error);
});