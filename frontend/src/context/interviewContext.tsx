import React, {createContext, useContext, useState} from 'react';
import {LocalVideoTrack, RemoteTrackPublication, Room, RoomEvent, Track} from "livekit-client";
import "../styles/VideoApp.css";

type TrackInfo = {
    trackPublication: RemoteTrackPublication;
    participantIdentity: string;
};

// When running OpenVidu locally, leave these variables empty
// For other deployment type, configure them with correct URLs depending on your deployment
let APPLICATION_SERVER_URL = import.meta.env.VITE_APP_SERVER_URL || "http://localhost:6080/";
let LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL || "ws://localhost:7880/";

const InterviewContext = createContext<any>(null);

export const InterviewProvider = ({children}: {children: React.ReactNode}) => {
    const [room, setRoom] = useState<Room | undefined>(undefined);
    const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(undefined);
    const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([]);

    const [participantName, setParticipantName] = useState("Participant" + Math.floor(Math.random() * 100));
    const [roomName, setRoomName] = useState("Test Room");

    async function joinRoom() {
        const room = new Room();

        room.on(RoomEvent.TrackSubscribed, (_track, publication, participant) => {
            setRemoteTracks((prev) => [
                ...prev,
                {trackPublication: publication, participantIdentity: participant.identity}
            ]);
        });

        room.on(RoomEvent.TrackUnsubscribed, (_track, publication) => {
            setRemoteTracks((prev) => prev.filter((t) => t.trackPublication.trackSid !== publication.trackSid));
        });

        try {
            const token = await getToken(roomName, participantName);
            await room.connect(LIVEKIT_URL, token);

            setRoom(room);

            await room.localParticipant.enableCameraAndMicrophone();

            const videoPublication = room.localParticipant.getTrackPublication(Track.Source.Camera);
            if (videoPublication?.videoTrack) {
                setLocalTrack(videoPublication.videoTrack as LocalVideoTrack);
            }

        } catch (error) {
            console.error("There was an error connecting to the room:", (error as Error).message);
            await room.disconnect();
            setRoom(undefined);
        }
    }

    async function leaveRoom() {
        await room?.disconnect();
        setRoom(undefined);
        setLocalTrack(undefined);
        setRemoteTracks([]);
    }

    /**
     * --------------------------------------------
     * GETTING A TOKEN FROM YOUR APPLICATION SERVER
     * --------------------------------------------
     * The method below request the creation of a token to
     * your application server. This prevents the need to expose
     * your LiveKit API key and secret to the client side.
     *
     * In this sample code, there is no user control at all. Anybody could
     * access your application server endpoints. In a real production
     * environment, your application server must identify the user to allow
     * access to the endpoints.
     */
    async function getToken(roomName: string, participantName: string) {
        const response = await fetch(APPLICATION_SERVER_URL + "token", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({roomName: roomName, participantName: participantName})
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Failed to get token: ${error.errorMessage}`);
        }

        const data = await response.json();
        return data.token;
    }

    return (
        <InterviewContext.Provider value={{room, localTrack, remoteTracks, joinRoom, leaveRoom, participantName, setParticipantName, roomName, setRoomName}}>
            {children}
        </InterviewContext.Provider>
    );
};

export const useInterview = () => useContext(InterviewContext);