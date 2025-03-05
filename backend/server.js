require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;

// JSONリクエスト対応
app.use(express.json());

// 動作確認用エンドポイント
app.get('/', (req, res) => {
  res.send('AutoRedirect Backend Running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const authRoutes = require('./routes/auth');

app.use('/api', authRoutes);
