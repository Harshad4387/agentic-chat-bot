<<<<<<< HEAD
// import React, { useState, useEffect } from 'react'
// import VoiceInput from '../components/VoiceInput'
// import MessageBubble from '../components/MessageBubble'
// import { sendChatMessage } from '../utils/api'
// import '../styles/chat.css'

// export default function ChatPage() {
//   const [chat, setChat] = useState([])
//   const [input, setInput] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [voices, setVoices] = useState([])

//   // Load available voices properly (async-safe)
//   const loadVoices = () => {
//     let allVoices = window.speechSynthesis.getVoices()
//     if (allVoices.length > 0) {
//       setVoices(allVoices)
//     } else {
//       // Retry once voices are loaded
//       window.speechSynthesis.onvoiceschanged = () => {
//         const updatedVoices = window.speechSynthesis.getVoices()
//         setVoices(updatedVoices)
//       }
//     }
//   }

//   useEffect(() => {
//     if ('speechSynthesis' in window) {
//       loadVoices()
//     }
//   }, [])

//   // ✅ Speak function with voice fallback
//   const speak = (text) => {
//   if (!window.speechSynthesis || !text) return;

//   const utterance = new SpeechSynthesisUtterance(text);

//   const allVoices = speechSynthesis.getVoices();

//   // Language detection (simplified)
//   const isHindi = /[\u0900-\u097F]/.test(text);   // Devanagari → Hindi
//   const isMarathi = /पुणे|तापमान|आहे|सध्या|काय/.test(text); // Keywords specific to Marathi

//   // Select preferred voice
//   const voice =
//     (isHindi && allVoices.find(v => v.lang === 'hi-IN')) ||
//     (isMarathi && allVoices.find(v => v.lang === 'mr-IN')) ||
//     allVoices.find(v => v.lang.startsWith('en')) ||
//     allVoices[0];

//   if (voice) {
//     utterance.voice = voice;
//     utterance.lang = voice.lang;
//   }

//   utterance.rate = 1;
//   utterance.pitch = 1;
//   speechSynthesis.cancel(); // Stop any current speech
//   speechSynthesis.speak(utterance);
// };

//   const addMessage = (type, text) => {
//     setChat(prev => [...prev, { type, text }])
//   }

//   const handleSubmit = async () => {
//     if (!input.trim()) return
//     addMessage('user', input)
//     setInput('')
//     setLoading(true)
//     try {
//       const res = await sendChatMessage(input)
//       const botReply = res.reply || res.message || '...'
//       addMessage('bot', botReply)
//       speak(botReply)
//     } catch (err) {
//       const errorMsg = err.response?.data?.error || 'Something went wrong'
//       addMessage('bot', errorMsg)
//       speak(errorMsg)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleVoice = async (text) => {
//     if (!text.trim()) return
//     addMessage('user', text)
//     setInput(text)
//     setLoading(true)
//     try {
//       const res = await sendChatMessage(text)
//       const botReply = res.reply || res.message || '...'
//       addMessage('bot', botReply)
//       speak(botReply)
//     } catch (err) {
//       const errorMsg = err.response?.data?.error || 'Something went wrong'
//       addMessage('bot', errorMsg)
//       speak(errorMsg)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="chat-container">
//       <h2>👵 Elderly Voice Chatbot</h2>

//       <div className="chat-history">
//         {chat.map((msg, idx) => (
//           <MessageBubble key={idx} type={msg.type} text={msg.text} />
//         ))}
//         {loading && <MessageBubble type="bot" text="Typing..." />}
//       </div>

//       <div style={{ display: 'flex', gap: '0.5rem' }}>
//         <textarea
//           rows={2}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           style={{
//             width: '10%',
//             height: '70px',
//             padding: '10px 12px',
//             fontSize: '1rem',
//             backgroundColor: '#2a2a2a',
//             color: 'white',
//             border: 'none',
//             borderRadius: '10px',
//             resize: 'none',
//           }}
//         />
//         <button onClick={handleSubmit}>Send</button>
//         <VoiceInput onResult={handleVoice} />
//       </div>
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react'
=======
import React, { useState, useRef, useEffect } from 'react'
>>>>>>> cd8bbc9407d3aa9318ab6160642ae410f1b7da31
import VoiceInput from '../components/VoiceInput'
import MessageBubble from '../components/MessageBubble'
import { sendChatMessage } from '../utils/api'
import '../styles/chat.css'
import axios from 'axios'

export default function ChatPage() {
  const [chat, setChat] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
<<<<<<< HEAD
  const [voices, setVoices] = useState([])
  const [userLang, setUserLang] = useState('en')

  useEffect(() => {
    const interval = setInterval(() => {
      const allVoices = window.speechSynthesis.getVoices()
      if (allVoices.length > 0) {
        setVoices(allVoices)
        clearInterval(interval)
      }
    }, 200)
=======
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
>>>>>>> cd8bbc9407d3aa9318ab6160642ae410f1b7da31
  }, [])

  const detectLanguage = async (text) => {
    try {
      const res = await axios.post('https://libretranslate.com/detect', { q: text })
      return res.data[0]?.language || 'en'
    } catch {
      return 'en'
    }
  }

  const translateText = async (text, from, to) => {
    if (from === to) return text
    try {
      const res = await axios.post('https://libretranslate.com/translate', {
        q: text,
        source: from,
        target: to,
        format: 'text'
      })
      return res.data.translatedText
    } catch {
      return text
    }
  }

  const getBestVoice = (langCode) => {
    if (!voices.length) return null
    return (
      voices.find(v => v.lang === langCode) ||
      voices.find(v => v.lang.startsWith(langCode)) ||
      voices.find(v => v.lang.startsWith('en')) ||
      voices[0]
    )
  }

  const speak = (text, lang) => {
    if (!window.speechSynthesis || !text) return
    const utterance = new SpeechSynthesisUtterance(text)
<<<<<<< HEAD
    const voice = getBestVoice(lang)
    if (voice) {
      utterance.voice = voice
      utterance.lang = voice.lang
=======
    if (voiceRef.current) {
      utterance.voice = voiceRef.current
      utterance.lang = voiceRef.current.lang
    } else {
      utterance.lang = 'en-IN'
>>>>>>> cd8bbc9407d3aa9318ab6160642ae410f1b7da31
    }
    utterance.rate = 1
    utterance.pitch = 1
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  const addMessage = (type, text) => {
    setChat(prev => [...prev, { type, text }])
  }

  const processMessage = async (text) => {
    const detectedLang = await detectLanguage(text)
    setUserLang(detectedLang)

    const translatedToEnglish = await translateText(text, detectedLang, 'en')
    const response = await sendChatMessage(translatedToEnglish)

    const botReplyInEnglish = response.reply || response.message || '...'
    const translatedBack = await translateText(botReplyInEnglish, 'en', detectedLang)

    addMessage('bot', translatedBack)
    speak(translatedBack, detectedLang)
  }

  const handleSubmit = async () => {
    if (!input.trim()) return
    addMessage('user', input)
    setInput('')
    setLoading(true)
    try {
      await processMessage(input)
    } catch (err) {
      const errorMsg = 'Something went wrong'
      addMessage('bot', errorMsg)
      speak(errorMsg, 'en')
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
      await processMessage(text)
    } catch (err) {
      const errorMsg = 'Something went wrong'
      addMessage('bot', errorMsg)
      speak(errorMsg, 'en')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-container">
      <h2>🗣️ Multilingual Voice Chatbot</h2>
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
            width: '80%',
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
