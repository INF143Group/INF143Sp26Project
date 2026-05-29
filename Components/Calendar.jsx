import { useRef, useState } from "react";
import {ToastContainer, toast} from "react-toastify";
import NavBar from "./nav-bar.jsx";
import EventAddPopup from "./EventAddPopup.jsx";
import  FullCalendar  from "@fullcalendar/react";
import  dayGridPlugin  from "@fullcalendar/daygrid";
import  interactionPlugin   from "@fullcalendar/interaction";

import "../Styles/Calendar.css";
import Footer from "./footer.jsx";

const DEFAULT_ID="00000000-0000-0000-0000-000000000002";

const ROOT = "http://localhost:8080/";  

let calendarRef = null;
let eventPopupRef = null;
let defaultDate, setDefaultDate = null;
let isSchedulerOpen, setIsSchedulerOpen = null;

function displayAddEventDiv(e){
    console.log(e);
    setDefaultDate(e.dateStr);
    setIsSchedulerOpen(true);
}
async function uploadEvent(dateObj){
    const resp = await fetch(ROOT + "api/calendar", {
        method: "POST",
        body: JSON.stringify(dateObj),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!resp.ok) {
        throw new Error("Failed to upload event");
    }

    let respJson = await resp.json();
    if (respJson.success===false){
        throw new Error("Failed to parse event");
    }
    return respJson;
}
function getUserId(){
    return sessionStorage.getItem('user_id') || DEFAULT_ID;
}
function submitAndHideDiv(dateObj){
    if (! dateObj.success){
        toast.warn("Not scheduled: " + dateObj.msg);
        setIsSchedulerOpen(false);
        return;
    }

    dateObj.userId=getUserId();

    uploadEvent(dateObj).then((status) => {
        if (status.success===false){
            toast.error("Failed to schedule event.");
        } else {
            // calendarRef.current.getApi().addEvent({
            //     title: "Interview with " + dateObj.interviewerName,
            //     start: dateObj.date + " " + dateObj.time,
            // })
            calendarRef.current.getApi().refetchEvents();
            toast.success(() => AddSubtext(dateObj), {
                className: '!w-fit !max-w-none',
            });
        }
    }).catch(() => {
        toast.error("Failed to schedule event.");
    });
    setIsSchedulerOpen(false);
}
function AddSubtext(dateObj){
    return (
        <div className="grid grid-cols-[1fr_1px_80px] w-full">
            <div className="flex flex-col p-3">
                <h4 className="text-zinc-800 text-sm font-semibold">Event Submitted</h4>
                <p className="m-0 text-sm">Interviewer: <b>{dateObj.interviewerName}</b></p>
                <p className="m-0 text-sm whitespace-nowrap">Interviewer email: <b>{dateObj.interviewerEmail}</b></p>
                <p className="m-0 text-sm">Date: <b>{dateObj.date}</b></p>
                <p className="m-0 text-sm">Time: <b>{dateObj.time}</b></p>
            </div>
        </div>
    )
}
function isUserLoggedIn(){
    return !!sessionStorage.getItem('user_id');
}

async function getEvents(){
    if (! isUserLoggedIn()){ 
        console.error("No user is logged in");
        return [];
    }

    const resp = await fetch(ROOT + "api/calendar?userId="+getUserId());
    if (!resp.ok) {
        console.error("Failed to fetch events");
        return [];
    }
    const respJson = await resp.json();
    if (respJson.success===false){
        console.error("Failed to parse resp json");
        return [];
    }

    let responseEvents = respJson.events;
    let myStartTime = null;
    let myEndTime = null;
    let returnEvents = [];
    responseEvents.events_as_interviewer.forEach((event) => {
        myStartTime = new Date(event.event_at);
        myEndTime = new Date(myStartTime.getTime() + event.minute_length*60000);

        returnEvents.push({
            id: event.event_id,
            title: "Interview for: " + event.interviewee.display_name,
            start : myStartTime,
            end: myEndTime
        })
    
    });
    responseEvents.events_as_interviewee.forEach((event) => {
        myStartTime = new Date(event.event_at);
        myEndTime = new Date(myStartTime.getTime() + event.minute_length*60000);

        returnEvents.push({
            id: event.event_id,
            title: "Interview with: " + event.interviewer.display_name,
            start : myStartTime,
            end: myEndTime
        })
    
    });
    return returnEvents;
}

function addEvent(){

}

export default function Calendar(){

    calendarRef = useRef(null);
    eventPopupRef = useRef(null);

    [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
    [defaultDate, setDefaultDate] = useState(null);

    function SchedulerDiv(){
        return(
            <div className="scheduler-wrapper">
                <h1>Scheduler</h1>
            </div>
        );
    }

    return(
        <div className="calendar-wrapper">
            <div className={"div1"} id={"nav-bar"}>
                <NavBar/>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.20/index.global.min.js"></script>
            <div className={"calendar-heading"} id={"calendar-heading"}>
                <h1>Calendar</h1>
            </div>
            <ToastContainer/>
            <div className="stack">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dateClick={displayAddEventDiv}
                    customButtons={{
                        addEventTodayButton: {
                            text: 'add an event today',
                            click: () => {
                                let date = new Date(Date.now());
                                let dateStr = date.getFullYear() + "-" + String((date.getMonth()+1)).padStart(2, '0') + "-" + date.getDate();
                                displayAddEventDiv({dateStr: dateStr})
                            }
                        }
                    }}
                    headerToolbar= {{
                        center: 'addEventTodayButton'
                    }}
                    events={getEvents}
                />
                <div className="top-layer">
                    <EventAddPopup
                    isOpen={isSchedulerOpen}
                    onClose={submitAndHideDiv}
                    defaultDate={defaultDate}
                    />
                </div>
            </div>
            <div className="div6" id="bottom-nav-bar" >
                <Footer/>
            </div>
        </div>
    );
}


    