require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;

// JSONリクエスト対応
app.use(express.json());

// ルート登録（これをapp.listenの前に移動）
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

// 動作確認用エンドポイント
app.get('/', (req, res) => {
  res.send('AutoRedirect Backend Running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})