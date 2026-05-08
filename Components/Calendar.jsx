import { useRef, useState } from "react";
import NavBar from "../Components/nav-bar.jsx";
import  FullCalendar  from "@fullcalendar/react";
import  dayGridPlugin  from "@fullcalendar/daygrid";
import  interactionPlugin   from "@fullcalendar/interaction";

import "../Styles/Calendar.css";
import EventAddPopup from "./EventAddPopup.jsx";

const handleDateClick = (arg) => {
    alert(arg.dateStr)
  }

export default function Calendar(){

    const calendarRef = useRef(null);
    const eventPopupRef = useRef(null);

    const [isSchedulerOpen, setIsSchedulerOpen] = useState(true);

    function displayAddEventDiv(arg){
        setIsSchedulerOpen(true);
    }
    function hideAddEventDiv(arg){
        setIsSchedulerOpen(false);
    }

    return(
        <div className="calendar-wrapper">
            <div className={"div1"} id={"nav-bar"}>
                <NavBar/>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.20/index.global.min.js"></script>
            <h1>Calendar</h1>
            <div className="stack">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dateClick={handleDateClick}
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



function SchedulerDiv(){
    return(
        <div className="scheduler-wrapper">
            <h1>Scheduler</h1>
        </div>
    );
}