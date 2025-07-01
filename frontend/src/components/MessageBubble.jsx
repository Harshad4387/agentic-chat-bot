// src/components/MessageBubble.jsx
import React from 'react'
import "../styles/chat.css"
import botIcon from '../assets/bot.png'
import userIcon from '../assets/user.png'

export default function MessageBubble({ type, text }) {
  const isUser = type === 'user'
  const avatar = isUser ? userIcon : botIcon

  return (
    <div className={`message-row ${isUser ? 'align-right' : 'align-left'}`}>
      {!isUser && <img src={avatar} alt="bot" className="avatar" />}
      <div className={`bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
        {text}
      </div>
      {isUser && <img src={avatar} alt="user" className="avatar" />}
    </div>
  )
}
