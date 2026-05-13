import { useRef, useState } from "react";
import {ToastContainer, toast} from "react-toastify";
import NavBar from "../Components/nav-bar.jsx";
import  FullCalendar  from "@fullcalendar/react";
import  dayGridPlugin  from "@fullcalendar/daygrid";
import  interactionPlugin   from "@fullcalendar/interaction";
import EventAddPopup from "./EventAddPopup.jsx";

import "../Styles/Calendar.css";

export default function Calendar(){

    const calendarRef = useRef(null);
    const eventPopupRef = useRef(null);

    const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

    function SchedulerDiv(){
        return(
            <div className="scheduler-wrapper">
                <h1>Scheduler</h1>
            </div>
        );
    }

    function displayAddEventDiv(arg){
        setIsSchedulerOpen(true);
    }
    function hideAddEventDiv(dateObj){
        if (dateObj.success){
            toast.success(() => AddSubtext(dateObj),{
                className: '!w-fit !max-w-none',
            });
        } else{
            // toast.error("Event addition cancelled.");
            toast.warn("Not scheduled: " + dateObj.msg);
        }
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

    return(
        <div className="calendar-wrapper">
            <div className={"div1"} id={"nav-bar"}>
                <NavBar/>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.20/index.global.min.js"></script>
            <h1>Calendar</h1>
            <ToastContainer
                toastStyle={{width: "fit-content", maxWidth: "none"}}
            />
            <div className="stack">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dateClick={displayAddEventDiv}
                    customButtons={{
                        addEventTodayButton: {
                            text: 'add an event today',
                            click: displayAddEventDiv
                        }
                    }}
                    headerToolbar= {{
                        center: 'addEventTodayButton'
                    }}
                />
                <div className="top-layer">
                    <EventAddPopup
                    isOpen={isSchedulerOpen}
                    onClose={hideAddEventDiv}
                    />
                </div>
            </div>
        </div>
        
    );
}


    