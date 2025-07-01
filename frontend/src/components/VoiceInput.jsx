// src/components/VoiceInput.jsx
import React, { useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const VoiceInput = ({ onResult }) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition()

  const handleMic = () => {
    resetTranscript()
    SpeechRecognition.startListening({ continuous: false })
  }

  useEffect(() => {
    if (!listening && transcript) {
      onResult(transcript)
    }
  }, [listening])

  return (
   <button
  onClick={handleMic}
  className={`mic-button ${listening ? 'glow' : ''}`}
  title="Speak"
>
  🎤
</button>

  )
}

export default VoiceInput
