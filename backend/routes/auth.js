const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');  // DB接続

const router = express.Router();

// ユーザー登録API
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

module.exports = router;
