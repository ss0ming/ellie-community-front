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

    const modalOpenButton = document.querySelector('#withdraw');
    const modalCloseButton = document.querySelector('.cancel-btn');
    const modalCloseButton2 = document.querySelector('.check-btn');
    const modal = document.querySelector('.modal');

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

    const modifyBtn = document.getElementById('modify-btn');
    const nickname = document.getElementById('nickname-input');
    const nicknameHelper = document.getElementById('nickname-helper');
    const toastMessage = document.getElementById('toast-message');
    const blankPattern = /[\s]/g;

    const toastOn = () => {
        toastMessage.classList.add('active');
        setTimeout(function() {
            toastMessage.classList.remove('active');
        }, 1000) ;
    }

    const nicknameValidCheck = () => {
        if (!nickname.value) {
            nicknameHelper.innerHTML = '* 닉네임을 입력해주세요.';
            return false;
        } else if (blankPattern.test(nickname.value) == true) {
            console.log("1")
            nicknameHelper.innerHTML = '* 띄어쓰기를 없애주세요.';
            return false;
        } else if (nickname.value.length > 10) {
            console.log("2")
            nicknameHelper.innerHTML = '* 닉네임은 최대 10자까지 가능합니다.';
            return false;
        }

        nicknameHelper.innerHTML = '';
        return true;
    }

    modalOpenButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    modalCloseButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modalCloseButton2.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // 수정 완료 버튼 클릭 시 토스트 생성
    modifyBtn.addEventListener('click', () => {
        if (nicknameValidCheck()) {
            toastOn();
        } 
    })

}

// 초기화 함수 호출
init().catch(error => {
    console.error('Error during initialization:', error);
});