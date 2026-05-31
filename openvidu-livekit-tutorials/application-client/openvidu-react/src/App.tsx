import {LocalVideoTrack, RemoteVideoTrack, LocalAudioTrack, RemoteAudioTrack} from "livekit-client";
import {Key} from "react";
import AudioComponent from "./components/AudioComponent.tsx";
import VideoComponent from "./components/VideoComponent.tsx";
import {useInterview} from "./interviewContext.tsx";

function App() {
    const {
        room, localTrack, remoteTracks, joinRoom, leaveRoom,
        participantName, setParticipantName, roomName, setRoomName
    } = useInterview();

    if (!room) {
        return (
            <div id="join-container">
                <div className="join-card">
                    <div className="join-header">
                        <h3>Interview Session</h3>
                        <p>Enter your details to begin the video call</p>
                    </div>

                    <form className="join-form" onSubmit={(e) => {
                        e.preventDefault();
                        joinRoom();
                    }}>
                        <div className="input-group">
                            <label>Your Name</label>
                            <input
                                placeholder="e.g. John Doe"
                                value={participantName}
                                onChange={(e) => setParticipantName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Room ID</label>
                            <input
                                placeholder="e.g. Test Room"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="join-btn">
                            <span>Join Meeting</span>
                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div id = "room" style = {{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <div id = "layout-container">
                {localTrack && (
                    <VideoComponent track = {localTrack} participantIdentity = {participantName} local = {true}/>
                )}
                {remoteTracks.map((remoteTrack: { trackPublication: {kind: string; trackSid: Key | null | undefined; videoTrack: LocalVideoTrack | RemoteVideoTrack; audioTrack: LocalAudioTrack | RemoteAudioTrack; }; participantIdentity: string;}) =>
                    remoteTrack.trackPublication.kind === "video" ? (
                        <VideoComponent
                            key = {remoteTrack.trackPublication.trackSid}
                            track = {remoteTrack.trackPublication.videoTrack!}
                            participantIdentity = {remoteTrack.participantIdentity}
                        />
                    ) : (
                        <AudioComponent
                            key = {remoteTrack.trackPublication.trackSid}
                            track = {remoteTrack.trackPublication.audioTrack!}
                        />
                    )
                )}
            </div>
            <button className = "btn btn-danger" onClick = {leaveRoom} style = {{margin: '10px'}}>
                Leave Room
            </button>
        </div>
    );
}

export default App;