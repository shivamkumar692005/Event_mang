import axios from "axios";
import { useState } from "react";

export const FilterEvent = ({ setEvent, fetchAllEvents }) => {
    const [date, setDate] = useState('');

    async function handleOnChange(e) {
        const selectedDate = e.target.value;
        setDate(selectedDate);

        if (selectedDate) {
            const res = await axios.post('http://localhost:8080/api/event/filter', { date: selectedDate });
            setEvent(res.data);
        } else {
            fetchAllEvents();
        }
    }

    return (
        <input
            type="date"
            name="date"
            onChange={handleOnChange}
            value={date}
            placeholder="Filter by date"
        />
    );
};
