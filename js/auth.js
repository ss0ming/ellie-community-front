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

export { checkLoginStatus };