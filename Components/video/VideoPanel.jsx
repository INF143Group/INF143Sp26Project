import React, { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';

function getSignalingServerURL() {
    return "http://localhost:8080/"
}

function VideoPanel() {
    const [peerId, setPeerId] = useState('');
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const peerInstance = useRef(null);

    
    
    useEffect(() => { 
        const peer = new Peer();

    peer.on('open', (id) => {
        setPeerId(id);
    });
    peer.on('call', (call) => {
        var getUserMedia = navigator.getUserMedia 
      || navigator.webkitGetUserMedia 
     || navigator.mozGetUserMedia;

     getUserMedia({video: true, audio: true}, (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        call.answer(mediaStream);
        call.on('stream', function (remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
        });
     });
    });
    peer.on('error', console.error);
    peerInstance.current = peer;

    
    

    }, []);

    const call = (remotePeerId) => {
        var getUserMedia = navigator.getUserMedia 
        || navigator.webkitGetUserMedia 
        || navigator.mozGetUserMedia;

        getUserMedia({ video: true, audio: true }, (mediaStream) => {
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play();

            const call = peerInstance.current.call(remotePeerId, mediaStream);

            call.on('stream', (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream;
                remoteVideoRef.current.play();
            });
            call.on('error', console.error);
        });
    }

    return (
        <div>
            <h1>Current user id is {peerId}</h1>
            <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
            <button onClick={() => call(remotePeerIdValue)}>Call</button>
            <video ref={currentUserVideoRef} autoPlay muted playsInline className="localVideo" style={{width: '45%', marginRight: '10px'}} />
            <video ref={remoteVideoRef} autoPlay playsInline className="remoteVideo" style={{width: '45%'}} />
        </div>
    );
}

export default VideoPanel;