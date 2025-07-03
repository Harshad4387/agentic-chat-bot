import React, { useState, useEffect } from 'react'
import VoiceInput from '../components/VoiceInput'
import MessageBubble from '../components/MessageBubble'
import { sendChatMessage } from '../utils/api'
import '../styles/chat.css'

export default function ChatPage() {
  const [chat, setChat] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [voices, setVoices] = useState([])
  const [userLang, setUserLang] = useState('en')

  // 🔄 Load voices with retry
  useEffect(() => {
    const waitForVoices = () => {
      const allVoices = window.speechSynthesis.getVoices()
      if (allVoices.length > 0) {
        setVoices(allVoices)
        console.log("✅ Voices loaded:", allVoices.map(v => `${v.name} - ${v.lang}`))
      } else {
        console.log("🔁 Waiting for voices...")
        setTimeout(waitForVoices, 200)
      }
    }
    waitForVoices()
  }, [])

  // ✅ Offline Hindi/Marathi language detection
const detectLanguage = (text) => {
  // 🔹 Common Hindi and Marathi words
  const hindiWords = [
    "क्या", "कैसे", "कौन", "आप", "हैं", "हूँ", "हो", "था", "थी", "थोड़ा", "बहुत", "समय", "क्यों", "कब",
    "अब", "बाद", "जैसे", "कहाँ", "यह", "वह", "मुझे", "तुम", "हम", "मैं", "मेरा", "मेरी", "अपना", "खुश",
    "पढ़ाई", "खाना", "पानी", "स्कूल", "घर", "दोस्त", "शादी", "काम", "पढ़ना", "लिखना", "गाना", "नाचना",
    "फिल्म", "टीवी", "देखना", "समझ", "सुनो", "बताओ", "बोलो", "बताइए", "चलिए", "कृपया", "धन्यवाद",
    "सवाल", "जवाब", "सच", "झूठ", "भाषा", "हिंदी", "समस्या", "समाधान", "स्वागत", "स्वस्थ", "शुभ",
    "रात", "दोपहर", "सुबह", "शाम", "अभी", "जल्दी", "धीरे", "बिलकुल", "जरूरी", "मदद", "कृपया",
    "सिखाओ", "बचपन", "बूढ़ा", "नई", "पुराना", "अच्छा", "बुरा", "ठीक", "खत्म", "चुप", "जाओ", "ठहरो"
  ]

  const marathiWords = [
    "काय", "कसा", "कशी", "तुम्ही", "आपण", "आहे", "होते", "झाले", "माझं", "नाव", "खूप", "छान", "असते",
    "भूक", "झाली", "खाल्लं", "आई", "वडील", "शाळा", "सांग", "घर", "गेलो", "कुठे", "ये", "जाणे", "नाही",
    "हो", "होते", "होणार", "शिकवले", "खरं", "खरंच", "गोड", "थोडं", "पाणी", "चहा", "भात", "भाजी", "विचार",
    "शब्द", "समजलं", "करतो", "करते", "जमेल", "कृपया", "धन्यवाद", "संध्याकाळी", "सकाळी", "संध्या", "रात्र",
    "भेट", "मनापासून", "माफ", "उद्या", "आज", "काल", "सोपं", "कठीण", "सांगितलं", "बोल", "शिकव", "जरा",
    "थांब", "थांबा", "बघ", "पाह", "हस", "रड", "चिड", "शिक", "काम", "वाचन", "गाणं", "संगीत", "चित्रपट",
    "मित्र", "मैत्री", "प्रेम", "भाऊ", "बहीण", "पुस्तक", "सत्य", "खोटं", "शिक्षण", "संदेश", "माहिती", "तपशील"
  ]

  const isHindi = hindiWords.some(word => text.includes(word))
  const isMarathi = marathiWords.some(word => text.includes(word))

  if (isHindi && !isMarathi) {
    console.log("🧠 Detected: Hindi (via keyword)")
    return 'hi'
  }

  if (isMarathi && !isHindi) {
    console.log("🧠 Detected: Marathi (via keyword)")
    return 'mr'
  }

  if (isHindi && isMarathi) {
    console.log("🧠 Detected: Shared script, falling back to Hindi")
    return 'hi'
  }

  // Fallback using script (Unicode range for Devanagari)
  const hasDevanagari = /[\u0900-\u097F]/.test(text)
  if (hasDevanagari) {
    console.log("🧠 Detected: Devanagari script, assuming Hindi")
    return 'hi'
  }

  console.log("🧠 Detected: English (default fallback)")
  return 'en'
}


  // 🔁 Translation disabled (no LibreTranslate)
  const translateText = async (text, from, to) => {
    if (from === to) return text
    return text // no real translation (could integrate later)
  }

  // 🔊 Voice speaker with language awareness
  const speak = (text, lang = 'en') => {
    const speakWhenReady = () => {
      const allVoices = window.speechSynthesis.getVoices()
      const lekha = allVoices.find(v => v.name.includes('Lekha'))

      const finalVoice = (lang === 'hi' || lang === 'mr') && lekha
        ? lekha
        : allVoices.find(v => v.lang === lang) ||
          allVoices.find(v => v.lang.startsWith(lang)) ||
          allVoices.find(v => v.lang.startsWith('en')) ||
          allVoices[0]

      if (!finalVoice) {
        console.warn("❌ No voice found for lang:", lang)
        return
      }

      const utter = new SpeechSynthesisUtterance(text)
      utter.voice = finalVoice
      utter.lang = finalVoice.lang
      utter.rate = 1
      utter.pitch = 1

      console.log(`🗣️ Speaking using: ${finalVoice.name} (${finalVoice.lang})`)
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utter)
    }

    if (!voices.length) {
      console.log("⏳ Voices not ready, retrying...")
      setTimeout(() => speak(text, lang), 200)
    } else {
      speakWhenReady()
    }
  }

  const addMessage = (type, text) => {
    setChat(prev => [...prev, { type, text }])
  }

  const processMessage = async (text) => {
    const detectedLang = detectLanguage(text)
    setUserLang(detectedLang)
    console.log("🌐 Detected Language:", detectedLang)

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
