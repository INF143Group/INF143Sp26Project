import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

function getSignalingServerURL() {
    return "/"
}

function VideoPanel() {
    
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const socketRef = useRef();
    const peerConnection = useRef(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    useEffect(() => { 

        const cleanup = initializeWebRTC({ localVideoElement: localVideoRef.current, remoteVideoElement: remoteVideoRef.current, roomId: "defaultRoom" });

        return () => cleanup();

        socketRef.current = io.connect(getSignalingServerURL());

        const initializeMedia = async () => {
            try {
                const stream  = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
                setLocalStream(stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
                setupPeerConnection(stream);
            } catch (error) {
                console.error('Failed to get media devices:', error);
            }
        };

        initializeMedia();

        socketRef.current.on('receiveCandidate', candidate => {
            peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
        });
        return () => socketRef.current.disconnect();
    }, []);

    

    return (
        <div>
            <video ref={localVideoRef} autoPlay muted playsInline className="localVideo" style={{width: '45%', marginRight: '10px'}} />
            <video ref={remoteVideoRef} autoPlay playsInline className="remoteVideo" style={{width: '45%'}} />
        </div>
    );
}

export default VideoPanel;