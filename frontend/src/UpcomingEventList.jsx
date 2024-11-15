import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EventList } from "./EventList";

export const UpcomingEventList = ({setEvent, events}) => {
    useEffect(() => {
        async function getEvent() {
          const response = await axios.get("http://localhost:8080/api/event/upcomming");
          setEvent(response.data);
        }
        getEvent();
      }, []);

   return(
    <EventList events={events} />
   )
}