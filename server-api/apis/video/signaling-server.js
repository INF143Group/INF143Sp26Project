export function initializeSignaling(io){
    io.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('disconnect', () => {
            socket.to(roomId).emit("peerDisconnected");
            console.log('user disconnected');
        });

        socket.on('sendCandidate', ({roomId, candidate}) => {
            socket.to(roomId).emit(
                "receiveCandidate", candidate
            );
        });

        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
        });
        socket.on('sendOffer', ({roomId, offer}) => {
            socket.to(roomId).emit(
                "receiveOffer", offer
            );
        });
        socket.on('sendAnswer', ({roomId, answer }) => {
            socket.to(roomId).emit(
                "receiveAnswer", answer
            );
        });
    });
}

