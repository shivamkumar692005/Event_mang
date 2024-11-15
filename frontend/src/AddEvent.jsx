import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddEvent = ({ setReload }) => {
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: "",
    date: "",
    description: "",
  });

  function handleOnChange(e) {
    setEvent({ ...event, [e.target.name]: e.target.value });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const res = await axios.post("http://localhost:8080/api/event", event);
    setEvent({ title: "", date: "", description: "" });
    setReload((prev) => !prev); 
    navigate("/");
  }

  return (
    <>
      <form style={{ marginTop: "10px" }} onSubmit={handleFormSubmit}>
        <label>
          Event Title:
          <input
            type="text"
            value={event.title}
            name="title"
            onChange={handleOnChange}
          />
        </label>
        <br />
        <br />
        <label>
          Event Date:
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleOnChange}
          />
        </label>
        <br />
        <br />
        <label>
          Event Description:
          <input
            type="text"
            name="description"
            value={event.description}
            onChange={handleOnChange}
          />
        </label>
        <br />
        <br />
        <button type="submit">Add</button>
      </form>
    </>
  );
};
