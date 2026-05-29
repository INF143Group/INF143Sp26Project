import React, { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';

function getSignalingServerURL() {
    return "http://localhost:8080/"
}

function VideoPanel() {
    const [peerId, setPeerId] = useState('');
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const mediaStream = useRef(null);
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const peerInstance = useRef(null);

    
    
    useEffect(() => { 
        const peer = new Peer(undefined, {
            host: 'localhost',
            port: 8080,
            path: '/peer'
        });

        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then((stream) => {
                console.log("🎥 Local camera hardware hooked successfully.");
                mediaStream.current = stream;
                if (currentUserVideoRef.current) {
                    currentUserVideoRef.current.srcObject = stream;
                    currentUserVideoRef.current.play().catch(e => console.error("Local play deferred:", e));
                }
            })
            .catch(err => {
                console.error("❌ Camera hardware access denied. (Is another browser locking it?):", err);
            });

        peer.on('open', (id) => {
            console.log("openpeer with id " + id);
            setPeerId(id);
        });
        peer.on('call', (call) => {
            
            alert("receiving call from " + call.peer);
            call.on('stream', function (remoteStream) {
                console.log("receiving remote stream");
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = remoteStream;
                    remoteVideoRef.current.play()
                        .catch(error => console.error("something went wrong"));
                    
                }
            });
            if (mediaStream.current) {
                call.answer(mediaStream.current);
            } else {
                console.warn("Local camera stream wasn't ready. Answering with blank channel.");
                // Fallback: Try to answer empty if hardware is still spinning up
                call.answer(); 
            }
        });
        peer.on('error', console.error);

        peerInstance.current = peer;

        return () => {
            if (mediaStream.current) {
                mediaStream.current.getTracks().forEach(track => track.stop());
            }
            peer.destroy();
        };
    }, []);

    const call = (remotePeerId) => {
        if (! mediaStream.current) {
            alert("Your webcam stream is not ready yet! Wait a second or check hardware permissions.");
            return;
        }
        alert("calling " + remotePeerId);

        const call = peerInstance.current.call(remotePeerId, mediaStream.current);

        call.on('stream', (remoteStream) => {
            console.log("receiving remote stream 2");
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
                remoteVideoRef.current.play()
                    .catch(error => console.error("something went wrong"));
            }
        });
        call.on('error', console.error);
    }

    return (
        <div>
            <h1>Current user id is {peerId}</h1>
            <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
            <button onClick={() => call(remotePeerIdValue)}>Call</button>
            <video ref={currentUserVideoRef} autoPlay muted playsInline className="localVideo" style={{width: '45%', marginRight: '10px'}} />
            <video ref={remoteVideoRef} autoPlay muted playsInline className="remoteVideo" style={{width: '45%'}} />
        </div>
    );
}

export default VideoPanel;