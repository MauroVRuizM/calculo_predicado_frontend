import React, { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Speech from 'react-speech';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { startAskCheck, clearCheck } from '../actions/checks';

export const Checks = () => {

    const [playing, setPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const speechRef = useRef();
    const dispatch = useDispatch();
    const { check } = useSelector( state => state );
    const { response, status } = check;


    const handleAskCheck = () => {
        if(transcript !== '') {
            let message = `¿ ${transcript} ?`;
            dispatch(startAskCheck(message));
            setLoading(true);
        }
    }

    useEffect(() => {
        if(status === 200) {
            setLoading(false);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Consulta Exitosa!",
                showConfirmButton: false,
                timer: 2000,
                didClose: () => { 
                    speechRef.current.play();
                    setPlaying(true);
                }
            })
        }
    }, [status, response])

    const handleReset = () => {
        resetTranscript();
        dispatch(clearCheck());
    }

    const handleStop = () => {
        SpeechRecognition.stopListening()
        if(playing) {
            speechRef.current.stop();
            setPlaying(false);
        }
    }


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
            <p>Micrófono: {listening ? 'conectado' : 'apagado'}</p>
            <button 
                onClick={SpeechRecognition.startListening}
                className="btn btn-outline-success"
            >Iniciar</button>
            <button 
                onClick={handleStop}
                className="btn btn-outline-danger"
            >Parar</button>
            <button 
                onClick={handleReset}
                className="btn btn-outline-info"
            >Limpiar</button>
            <button 
                onClick={handleAskCheck}
                className="btn btn-outline-warning"
            >Consultar</button>
            <br /> <br />
            <h5>Pregunta</h5>
            <p> <strong>{`¿ ${transcript} ?`}</strong> </p>
            <br />
            <h5>Respuesta</h5>
                {
                    loading ? 
                    <div className="container">
                        <div className="spinner-border text-info" role="status">
                            <span className="sr-only">Cargando...</span>
                        </div>
                    </div>
                    : !!response && response.map((item, index) => {
                        return (
                            <p key={index}>{item}</p>
                        )
                    })
                }
            <Speech
                ref={speechRef}
                text={ !!response && [...response].toString()}
                lang="en-US"
                voice="Microsoft Sabina - Spanish (Mexico)"
            />
        </div>
    )
}
