import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { EventList } from "./EventList";
import { UpcomingEventList } from "./UpcomingEventList";
import { AddEvent } from "./AddEvent";
import { FilterEvent } from "./FilterEvent";

function App() {
  const [events, setEvent] = useState([]);
  const [upcomingEvents, setUpcomingEvent] = useState([]);
  const [reload, setReload] = useState(false); 

  const fetchAllEvents = async () => {
    const response = await axios.get("http://localhost:8080/api/event");
    setEvent(response.data);
  };

  
  useEffect(() => {
    fetchAllEvents();
  }, [reload]); // Add `reload` to the dependency array

  return (
    <Router>
      <h1>Event Manager</h1>
      <div>
        <nav>
          <Link to="/" onClick={fetchAllEvents}>All Events</Link> 
          {" | "}
          <Link to="/add">Add Events</Link>
          {" | "}
          <Link to="/upcoming">Upcoming Events</Link>
          {" | "}
          <FilterEvent setEvent={setEvent} fetchAllEvents={fetchAllEvents} />
        </nav>

        <Routes>
          <Route path="/" element={<EventList events={events} />} />
          <Route path="/upcoming" element={<UpcomingEventList events={upcomingEvents} setEvent={setUpcomingEvent} />} />
          <Route path="/add" element={<AddEvent setReload={setReload} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
