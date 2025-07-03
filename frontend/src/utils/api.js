import axios from 'axios';

export async function sendChatMessage(text) {
  const res = await axios.post(
    'http://localhost:3000/api/chat/groq',
    { text },               // ✅ match backend param
    { withCredentials: true }
  );
  return res.data;
}
