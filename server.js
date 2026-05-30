const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const BOT_ID = process.env.BOT_ID;
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

app.post('/groupme', async (req, res) => {
  const msg = req.body;
  if (msg.sender_type === 'bot') return res.sendStatus(200);
  const text = msg.text.trim().toLowerCase();
  if (text.startsWith('claim')) {
    const num = parseInt(text.replace('claim', ''));
    if (!isNaN(num)) {
      await fetch(`${APPS_SCRIPT_URL}?claim=${num}`);
      await sendMessage(`✅ Request #${num} has been claimed!`);
    }
  }
  res.sendStatus(200);
});

async function sendMessage(text) {
  await fetch('https://api.groupme.com/v3/bots/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bot_id: BOT_ID, text })
  });
}

app.get('/', (req, res) => res.send('ChemBot is running!'));
app.listen(3000, () => console.log('Bot running!'));
