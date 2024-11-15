export const EventList = ({events}) => {
 return(
    <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "20px",
      
    }}
  >

    {events.map((e) => {
      return (
        <div
          key={e._id}
          style={{
            border: "2px solid black",
            padding: "10px",
            borderRadius: "20px",
          }}
        >
          <h1>{e.title}</h1>
          <p>{e.description}</p>
          <p>{e.date.slice(0, 10)}</p>
        </div>
      );
    })}
  </div>
 )
};
