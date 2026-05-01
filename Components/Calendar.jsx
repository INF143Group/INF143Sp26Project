import NavBar from "../Components/nav-bar.jsx";
import  FullCalendar  from "@fullcalendar/react";
import  dayGridPlugin  from "@fullcalendar/daygrid";
import  interactionPlugin   from "@fullcalendar/interaction";

import "../Styles/Calendar.css";

const handleDateClick = (arg) => {
    alert(arg.dateStr)
  }

export default function Calendar(){
    return(
        <div className="calendar-wrapper">
            <div className={"div1"} id={"nav-bar"}>
                <NavBar/>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.20/index.global.min.js"></script>
            <h1>Calendar</h1>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                customButtons={{
                    addEventTodayButton: {
                        text: 'add an event today',
                        click: handleSchedulerButtonClick
                    }
                }}
                headerToolbar= {{
                    center: 'addEventTodayButton'
                }}
            />
        </div>
    );
}

function handleSchedulerButtonClick(){
    alert("Scheduler button clicked!");
}

function SchedulerDiv(){
    return(
        <div className="scheduler-wrapper">
            <h1>Scheduler</h1>
        </div>
    );
}