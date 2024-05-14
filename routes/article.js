import express from 'express';
import path from 'path';

const router = express.Router();
const __dirname = path.resolve();

// app.js 에서 prefix를 작성했기 때문에 아래 엔드포인트의 접근 주소는 /article/~~~ 가 됩니다.
// 아래 주소는 /article 이 됩니다.
// 람다식 내 코드가 한 줄인 경우 가독성을 위해 simplify를 진행할 수 있습니다.
router.get('/', (req, res) => res.sendFile(path.join(__dirname, 'pages/articles.html')));

// 아래 주소는 `/article/edit` 이 됩니다.
router.get('/:id/edit', (req, res) => res.sendFile(path.join(__dirname, 'pages/edit-article.html')));

// 아래 주소는 `/article/register` 이 됩니다.
router.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'pages/register-article.html')));

// 아래 주소는 `/article/detail` 이 됩니다.
router.get('/:id', (req, res) => res.sendFile(path.join(__dirname, 'pages/article-detail.html')));

export default router;