const checkLoginStatus = async () => {
    try {
        const res = await fetch('http://localhost:8000/members/checkSession', {
            method: 'GET',
            credentials: 'include',
        });

        if (!res.ok) {
            throw new Error('로그인 상태 확인에 실패했습니다.');
        }

        const data = await res.json();
        return data.id;
    } catch (error) {
        console.error('Error:', error.message);
        return -1;
    }
};

const logout = async () => {
    try {
        const res = await fetch('http://localhost:8000/members/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if (!res.ok) {
            throw new Error('로그아웃에 실패했습니다.');
        }

        // 로그아웃 성공시 게시판 페이지로
        location.href="http://localhost:3000/article";
    } catch (error) {
        console.error('Error: ', error.message);
    }
}

export { checkLoginStatus, logout };