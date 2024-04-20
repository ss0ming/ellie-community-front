// express 모듈을 불러옵니다.
import express from 'express';

import loginRoute from './routes/login.js'
import memberRoute from './routes/member.js'
import articleRoute from './routes/article.js'

// express 애플리케이션을 생성합니다.
const app = express();
// 웹 서버가 사용할 포트 번호를 정의합니다.
const port = 3000;

app.use(express.static('css'))
app.use(express.static('js'))
app.use(express.static('data'))

/**
* 루트 경로('/')에 대한 GET 요청을 처리
* 요청이 오면 'Hello World!' 문자열을 응답
*/
// req = request(요청), res = response(응답)
app.get('/', (req, res) => {
	// 응답.보내다('Hello World!');
  res.send('Hello World!!!');
});

app.use('/login', loginRoute);
app.use('/member', memberRoute);
app.use('/article', articleRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});