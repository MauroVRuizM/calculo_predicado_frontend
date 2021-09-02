import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const Checks = () => {

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }


    return (
        <div className="container mt-5">
            <div className="alert alert-dismissible alert-light">
                <h1>METAS</h1>
            </div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button 
                onClick={SpeechRecognition.startListening}
                className="btn btn-outline-success"
            >Start</button>
            <button 
                onClick={SpeechRecognition.stopListening}
                className="btn btn-outline-danger"
            >Stop</button>
            <button 
                onClick={resetTranscript}
                className="btn btn-outline-info"
            >Reset</button>
            <p>{transcript}</p>
        </div>
    )
}
