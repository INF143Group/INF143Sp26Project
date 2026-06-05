import {getConnection, getConnectionWithToken} from "../../utils.js"

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
        return {
            success: false,
            message: error
        }
    }

    if (eventsData.length === 0){
        return {
            success: true,
            events: {
                events_as_interviewer: [],
                events_as_interviewee: []
            }
        }
    }

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
async function uploadEvent(token, eventData){
    if (!eventData){
        return {
            success: false,
            message: "No event data provided"
        }
    }

    let userIds = await validateUsersAndReturnUserIds(eventData.interviewerEmail, eventData.userId);
    
    if (!userIds) {
        console.log("failed to validate userIds: ", userIds);
        return {
            success: false,
            message: "Failed to validate interviewer email"
        };
    }
    if (userIds.interviewerId === userIds.intervieweeId){
        console.log("interviewer and interviewee cannot be the same user: ", userIds);
        return {
            success: false,
            message: "Interviewer and interviewee cannot be the same user"
        };
    }

    const {error} = await (await getConnectionWithToken(token))
        .from("events")
        .insert({
            interviewee_id: userIds.intervieweeId,
            interviewer_id: userIds.interviewerId,
            event_at: new Date(eventData.date + "T" + eventData.time),
            minute_length: 90
        });
    if (error){
        console.error("Failed to insert event: ", error.message);
        return {
            success: false,
            message: "Failed to insert event"
        }
    }
    return {
        success: true,
        message: "Event successfully scheduled"
    }


}
async function validateUsersAndReturnUserIds(interviewerEmail, userId){
    console.log("Validating interviewer email: ", interviewerEmail);
    const { data, error } = await (await getConnection())
        .from("users")
        .select("user_id, email")
        .eq("email", interviewerEmail)
        .maybeSingle();
    if (!error && !data){
        console.error("No user found with email: ", interviewerEmail);
        return null;
    }
        if (error || !data){
        console.error("Failed to validate interviewee email: ", error?.message || "Unknown error");
        return null;
    }

    return {
        intervieweeId: data.user_id,
        interviewerId: userId
    };

}
async function catchNewEventRequest(req, res){
    let body = [];
    let parsedBody = null;
    req.on('data', chunk => { 
        body.push(chunk);
    });
    req.on('end', async () => {
        parsedBody = JSON.parse(Buffer.concat(body).toString());

        let auth = req.headers.authorization;
        if (auth?.split(" ").length !== 2 || auth.split(" ")[0] !== "Bearer"){
            res.status(401).send({
                success: false,
                message: "Unauthorized: Invalid or missing token"
            });
        }
        
        let token = auth.split(" ")[1]
        let resp = await uploadEvent(token, parsedBody);
        if (resp.success){
            console.log("Event uploaded successfully");
            res.status(200);
        } else{
            res.status(400);
        }
        res.send(resp);
    });
}

export default {getEventsJsonForUser, catchNewEventRequest, uploadEvent};