// express 모듈을 불러옵니다.
import express from 'express';
import path from 'path';

const __dirname = path.resolve();

// express 애플리케이션을 생성합니다.
const app = express();
// 웹 서버가 사용할 포트 번호를 정의합니다.
const port = 3000;

app.use(express.static('css'))
app.use(express.static('js'))

/**
* 루트 경로('/')에 대한 GET 요청을 처리
* 요청이 오면 'Hello World!' 문자열을 응답
*/
// req = request(요청), res = response(응답)
app.get('/', (req, res) => {
	// 응답.보내다('Hello World!');
  res.send('Hello World!!!');
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/login.html'))
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/register.html'))
});

app.get('/member-edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/edit-info.html'))
});

app.get('/member-edit-pw', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/edit-pwd.html'))
});

app.get('/article-list', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/articles.html'))
});

app.get('/article-detail', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/article-detail.html'))
});

app.get('/article-edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/edit-article.html'))
});

app.get('/article-register', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/register-article.html'))
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});