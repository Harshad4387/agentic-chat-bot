// src/utils/api.js
export async function sendChatMessage(message) {
  const res = await fetch('http://localhost:5000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ message })
  })

  const data = await res.json()
  return data
}
