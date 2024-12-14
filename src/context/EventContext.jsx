import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const eventContext = createContext(null);

export const useEventContext = () => {
  return useContext(eventContext);
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const addEvent = (event) => {
    console.log("Event data submitted:", event);
    setEvents((prev) => [
      ...prev,
      { ...event, isCompleted: false, type: event.type ?? "personal" },
    ]);
  };
  const updateEvent = (id) => {
    const eventToUpdate = events.find((event) => event.id === id);
    setSelectedEvent(eventToUpdate);
  };
  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    toast.success("Event deleted successfully");
  };
  const toggleEvent = (event) => {
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === event.id ? { ...e, isCompleted: !e.isCompleted } : e
      )
    );
  };

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("events"));
    if (events && events.length > 0) {
      setEvents(events);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  return (
    <eventContext.Provider
      value={{
        events,
        setEvents,
        addEvent,
        deleteEvent,
        updateEvent,
        toggleEvent,
        selectedEvent,
        setSelectedEvent,
      }}
    >
      {children}
    </eventContext.Provider>
  );
};

// Basic Structure
// const event = {
//     id: Date.now(),
//     name: name,
//     startTime: startTime,
//     endTime: endTime,
//     desc: desc,
//     type: type,
//     other date details
//  }
