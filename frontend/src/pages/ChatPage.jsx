import React, { useState } from 'react'
import VoiceInput from '../components/VoiceInput'
import MessageBubble from '../components/MessageBubble'
import { sendChatMessage } from '../utils/api'
import '../styles/chat.css'

export default function ChatPage() {
  const [chat, setChat] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const addMessage = (type, text) => {
    setChat(prev => [...prev, { type, text }])
  }

  const handleSubmit = async () => {
    if (!input.trim()) return
    addMessage('user', input)
    setInput('')
    setLoading(true)
    try {
      const res = await sendChatMessage(input)
      addMessage('bot', res.reply || res.message || '...')
    } catch (err) {
      addMessage('bot', err.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleVoice = async (text) => {
    if (!text.trim()) return
    addMessage('user', text)
    setInput(text)
    setLoading(true)
    try {
      const res = await sendChatMessage(text)
      addMessage('bot', res.reply || res.message || '...')
    } catch (err) {
      addMessage('bot', err.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-container">
      <h2>👵 Elderly Voice Chatbot</h2>

      <div className="chat-history">
        {chat.map((msg, idx) => (
          <MessageBubble key={idx} type={msg.type} text={msg.text} />
        ))}
        {loading && <MessageBubble type="bot" text="Typing..." />}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            width: '10%',
            height: '70px',
            padding: '10px 12px',
            fontSize: '1rem',
            backgroundColor: '#2a2a2a',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            resize: 'none',
          }}
        />

        <button onClick={handleSubmit}>Send</button>
        <VoiceInput onResult={handleVoice} />
      </div>
    </div>
  )
}
