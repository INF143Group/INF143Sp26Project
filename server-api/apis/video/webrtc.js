import io from 'socket.io-client';

let socket = null;
let peerConnection = null;
let localStream = null;

function getSignalingServerURL() {
    return "/"
}

const setupPeerConnection = (stream, remoteVideoElement, roomId) => {
        peerConnection = new RTCPeerConnection();
        stream.getTracks().forEach(track => {
            peerConnection.addTrack(track, stream);
        });
        
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('sendCandidate',
                {
                    roomId,
                    candidate: event.candidate
                });
            }
        };
        peerConnection.ontrack = (event) => {
            remoteVideoElement.srcObject = event.streams[0];
        };
    };

export async function initializeWebRTC({ localVideoElement, remoteVideoElement, roomId }) {

    socket = io.connect(getSignalingServerURL());
    
    socket.emit("joinRoom", roomId);
    localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    localVideoElement.srcObject = localStream;

    setupPeerConnection(localStream, remoteVideoElement, roomId);

    socket.on('receiveCandidate', async candidate => {
        if (candidate){
            try {
                await peerConnection.addIceCandidate(
                    new RTCIceCandidate(candidate)
                );
            } catch (err) {
                console.error("Failed to add ICE candidate:", err);
            }
        }
        
    });
    return () => socket.disconnect();
}