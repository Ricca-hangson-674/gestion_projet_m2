import React from "react";
import '@fullcalendar/react/dist/vdom'
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

import AdminLayout from "@/Layouts/AdminLayout";

export default function Roadmap(props) {
    const { auth, events } = props;

    console.log(events)

    return (
        <AdminLayout auth={auth}>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={events}
            />
        </AdminLayout>
    );
}
