import {getConnection} from "../../../back-end/utils.js"
let dummyEvents = [
    {
        id: 1,
        interviewer: {
            name: "interviewer woman",
            email: "fake@email.com"
        },
        date: {
            day: "5-14-2026",
            time: "2:00 PM"
        },
        lengthMinutes: 90
    },
    {
        id: 2,
        interviewer: {
            name: "interviewer man",
            email: "fake@wowow.com"
        },
        date: {
            day: "5-11-2026",
            time: "5:00 PM"
        },
        lengthMinutes: 60
    }
]
async function getEventsJsonForUser(userId){
    if (!userId)
        return {
            success: false,
            message: "no user ID"
        }

    const { data: eventsData, error } = await (await getConnection())
    .from("events")
    .select(`
        event_id, event_at, minute_length, notes,
        interviewer:users!interviewer_id(user_id, email, display_name),
        interviewee:users!interviewee_id(user_id, email, display_name)
    `)
    .or(`interviewer_id.eq.${userId},interviewee_id.eq.${userId}`);
        
    if (error || !eventsData){
        console.error("Failed to get events from DB: ", error?.message || "Unknown error");
        return {
            success: false,
            message: error
        }
    }

    console.log("Fetched events data: ", eventsData);

    // Find the primary user object from the first event match to populate top-level fields
    const primaryUser = eventsData[0].interviewer.id === userId 
        ? eventsData[0].interviewer 
        : eventsData[0].interviewee;

    return {
        success: true,
        events: {
            events_as_interviewer: eventsData.filter(e => e.interviewer.user_id === userId),
            events_as_interviewee: eventsData.filter(e => e.interviewee.user_id === userId)
        }
    }
}
function getEventsFromDB(userId){

}
async function uploadEvent(eventObj){
    const {data, error} = await getConnection().from("users").eq("id", 111).select("id").single();
    return {status: "success", event: eventObj};
}

export default {getEventsJsonForUser, uploadEvent};