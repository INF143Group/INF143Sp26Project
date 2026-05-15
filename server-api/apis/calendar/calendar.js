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
function getEventsJsonForUser(userId){
    return {
        success: true,
        events: dummyEvents
    }
    
}
function getEventsFromDB(userId){

}
async function uploadEvent(eventObj){
    return {status: "success", event: eventObj};
}

export default {getEventsJsonForUser, uploadEvent};