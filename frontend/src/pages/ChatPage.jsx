import React, { useState, useRef, useEffect } from 'react'
import VoiceInput from '../components/VoiceInput'
import MessageBubble from '../components/MessageBubble'
import { sendChatMessage } from '../utils/api'
import '../styles/chat.css'

export default function ChatPage() {
  const [chat, setChat] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const voiceRef = useRef(null)

  // On mount, select the best Indian English female voice
  useEffect(() => {
    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices()
      // Try to find a female Indian English voice
      let femaleVoice = voices.find(v => v.lang === 'en-IN' && v.name.toLowerCase().includes('female'))
      // If not found, pick any Indian English voice
      if (!femaleVoice) femaleVoice = voices.find(v => v.lang === 'en-IN')
      // If still not found, fallback to default
      voiceRef.current = femaleVoice || voices[0] || null
    }
    // Some browsers load voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = setVoice
    }
    setVoice()
  }, [])

  // ✅ Speak out bot responses
  const speak = (text) => {
    if (!window.speechSynthesis) return
    const utterance = new SpeechSynthesisUtterance(text)
    if (voiceRef.current) {
      utterance.voice = voiceRef.current
      utterance.lang = voiceRef.current.lang
    } else {
      utterance.lang = 'en-IN'
    }
    utterance.rate = 1
    utterance.pitch = 1
    window.speechSynthesis.cancel() // stop any ongoing speech
    window.speechSynthesis.speak(utterance)
  }

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
      const botReply = res.reply || res.message || '...'
      addMessage('bot', botReply)
      speak(botReply) // ✅ Speak bot response
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Something went wrong'
      addMessage('bot', errorMsg)
      speak(errorMsg) // ✅ Speak error if needed
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
      const botReply = res.reply || res.message || '...'
      addMessage('bot', botReply)
      speak(botReply) // ✅ Speak bot response
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Something went wrong'
      addMessage('bot', errorMsg)
      speak(errorMsg)
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