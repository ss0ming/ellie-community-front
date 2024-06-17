// 헤더 프로필
const dropdownBtn = document.querySelector(".header-profile-img");
const dropdownContent = document.querySelector(".dropdown-content");

// 프로필 클릭시
dropdownBtn.addEventListener('click', () => {
    dropdownContent.classList.toggle('active');
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