const express = require('express');
const router = express.Router();

// ユーザー登録（仮）
// 実際はDB保存やパスワードハッシュ化を後で追加
router.post('/signup', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    // 仮レスポンス（本番ではDB保存）
    res.status(201).json({ message: "User registered successfully!", email });
});

module.exports = router;
