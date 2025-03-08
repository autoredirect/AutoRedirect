const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: "認証エラー（トークンがありません）" });
    }

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = verified;  // 認証情報をリクエストに追加
        next();
    } catch (error) {
        res.status(403).json({ message: "無効なトークン" });
    }
};

module.exports = verifyToken;
