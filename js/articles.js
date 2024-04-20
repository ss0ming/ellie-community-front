fetch("/article.json")
    .then((res) => res.json())
    .then((articles) => {
        articles.forEach((article) => {
            console.log(article);
            const temp = document.createElement("div");
            temp.classList.add("list");
            temp.innerHTML = `<div class="list-top">
                    <h2>${article.title}</h2>
                    <div class="list-info">
                        <p>좋아요 ${calculateNum(article.likes)}  댓글 ${calculateNum(article.comment_count)}  조회수 ${calculateNum(article.view_count)}</p>
                        <div class="datetime"><p>${article.date_time}</p></div>
                    </div>
                </div>
                <hr>
                <div class="list-bottom">
                    <div class="profile">
                        <div class="profile-img"></div>
                        <p>${article.nickname}</p>
                    </div>
                </div> `
                document.querySelector(".content").append(temp);
        });
    });

function calculateNum(num) {
    if (num < 1000) {
        return num;
    } else if (num >= 1000 && num <10000) {
        return "1k";
    } else if (num >= 10000 && num <100000) {
        return "10k";
    }
    return "100k";
}