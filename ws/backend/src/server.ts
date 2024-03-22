import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3000;
const server = http.createServer(app); 

// WebSocketサーバーのインスタンスを作成
const wss = new WebSocket.Server({ server });

// WebSocket接続の処理
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// 通常のExpressルート
app.get('/', (req, res) => {
  res.send('Hello, World! API Server is Running!');
});

app.get('/api/hello', (req, res) => {
  console.log("Requested: ", req.url);
  res.json({ message: 'Hello, World!' });
});

const PORT = process.env.PORT || port;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});