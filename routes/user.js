import express from "express";
import path from "path";

const router = express.Router();
const __dirname = path.resolve()

// app.js 에서 prefix를 작성했기 때문에 아래 엔드포인트의 접근 주소는 /user/register 가 됩니다.
router.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'pages/register.html')));

// 접속 주소가 /user/member-edit 가 됩니다.
router.get('/member-edit', (req, res) => res.sendFile(path.join(__dirname, 'pages/edit-info.html')));

// 접속 주소가 /user/member-edit-pw 가 됩니다.
router.get('/member-edit-pw', (req, res) => res.sendFile(path.join(__dirname, 'pages/edit-pwd.html')));

export default router;