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
        // 🔹 既にユーザーが存在するか確認
        const [existingUser] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            console.warn(`⚠️ [WARNING] 登録失敗: ${email} は既に登録されています`);
            return res.status(409).json({ message: "このメールアドレスは既に登録されています。" });
        }

        // パスワードをハッシュ化
        const hashedPassword = await bcrypt.hash(password, 10);

        // DBに新規ユーザーを追加
        const [result] = await pool.query(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashedPassword]
        );

        console.log(`✅ [INFO] ユーザー登録成功: ID=${result.insertId}, Email=${email}`);
        res.status(201).json({ message: "ユーザー登録完了", userId: result.insertId });
    } catch (error) {
        console.error('❌ [ERROR] ユーザー登録エラー:', error);
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
            console.warn(`⚠️ [WARNING] 認証失敗: ${email} は登録されていません`);
            return res.status(401).json({ message: "認証失敗（ユーザーが存在しません）" });
        }

        const user = users[0];

        // パスワード照合
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            console.warn(`⚠️ [WARNING] 認証失敗: ${email} - パスワード不一致`);
            return res.status(401).json({ message: "認証失敗（パスワードが違います）" });
        }

        // JWT発行
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "3h" } // 🔹 有効期限を3時間に変更
        );

        console.log(`✅ [INFO] ログイン成功: ${email}`);
        res.json({ message: "ログイン成功", token });
    } catch (error) {
        console.error('❌ [ERROR] ログインエラー:', error);
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

        console.log(`✅ [INFO] プロフィール取得成功: ID=${req.user.userId}, Email=${req.user.email}`);
        res.json(users[0]);
    } catch (error) {
        console.error('❌ [ERROR] プロフィール取得エラー:', error);
        res.status(500).json({ message: "サーバーエラー（プロフィール取得失敗）" });
    }
});

module.exports = router;
