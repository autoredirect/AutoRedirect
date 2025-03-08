const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');  // DB接続
const verifyToken = require('../middleware/verifyToken');  // JWT認証ミドルウェアを追加

const router = express.Router();

// ✅ ユーザー登録API（/api/signup）
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "メールアドレスとパスワードは必須です。" });
    }

    try {
        // パスワードをハッシュ化
        const hashedPassword = await bcrypt.hash(password, 10);

        // DB保存
        const [result] = await pool.query(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashedPassword]
        );

        res.status(201).json({ message: "ユーザー登録完了", userId: result.insertId });
    } catch (error) {
        console.error('❌ ユーザー登録エラー:', error);
        res.status(500).json({ message: "サーバーエラー（DB登録失敗）" });
    }
});

// ✅ ログインAPI（/api/login）
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "メールアドレスとパスワードは必須です。" });
    }

    try {
        // DBからユーザー取得
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: "認証失敗（ユーザーが存在しません）" });
        }

        const user = users[0];

        // パスワード照合
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "認証失敗（パスワードが違います）" });
        }

        // JWT発行
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "ログイン成功", token });
    } catch (error) {
        console.error('❌ ログインエラー:', error);
        res.status(500).json({ message: "サーバーエラー（ログイン処理失敗）" });
    }
});

// ✅ 認証が必要なAPI（/api/profile）
router.get('/profile', verifyToken, async (req, res) => {
    try {
        // 認証済みユーザーの情報を取得
        const [users] = await pool.query('SELECT id, email FROM users WHERE id = ?', [req.user.userId]);

        if (users.length === 0) {
            return res.status(404).json({ message: "ユーザーが見つかりません" });
        }

        res.json(users[0]);
    } catch (error) {
        console.error('❌ プロフィール取得エラー:', error);
        res.status(500).json({ message: "サーバーエラー（プロフィール取得失敗）" });
    }
});

module.exports = router;
