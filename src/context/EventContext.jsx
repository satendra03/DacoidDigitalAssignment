import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// Create the event context to provide events-related data
export const eventContext = createContext(null);

// Custom hook to use the event context in other components
export const useEventContext = () => {
  return useContext(eventContext);
};

// EventProvider component to manage events state and actions
export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]); // State to hold all events
  const [selectedEvent, setSelectedEvent] = useState(null); // State to hold the selected event for update purposes

   // Function to add a new event
  const addEvent = (event) => {
    console.log("Event data submitted:", event);
    setEvents((prev) => [
      ...prev,
      { ...event, isCompleted: false, type: event.type ?? "personal" }, // Add new event with default values
    ]);
  };

   // Function to update the selected event (used when an event is clicked to edit)
  const updateEvent = (id) => {
    const eventToUpdate = events.find((event) => event.id === id); // Find event by ID
    setSelectedEvent(eventToUpdate); // Set it as the selected event
  };

  // Function to delete an event
  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id)); // Filter out the deleted event
    toast.success("Event deleted successfully");
  };

   // Function to toggle the completion status of an event
  const toggleEvent = (event) => {
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === event.id ? { ...e, isCompleted: !e.isCompleted } : e
      )
    );
  }; // Not Needed (implemented)

  // UseEffect to load events from localStorage when the component mounts
  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("events"));
    if (events && events.length > 0) {
      setEvents(events); // Set events if any are found in localStorage
    }
  }, []);

  // UseEffect to save events to localStorage whenever events state changes
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events)); // Save events to localStorage
  }, [events]);

  // Provide the context value to child components
  return (
    <eventContext.Provider
      value={{
        events,            // List of events
        setEvents,         // Function to set the events list
        addEvent,          // Function to add a new event
        deleteEvent,       // Function to delete an event
        updateEvent,       // Function to update an event
        toggleEvent,       // Function to toggle event completion
        selectedEvent,     // Currently selected event for updates
        setSelectedEvent,  // Function to set the selected event
      }}
    >
      {children}
    </eventContext.Provider>
  );
};

// Basic structure of an event object
// const event = {
//     id: Date.now(),     // Unique event ID based on timestamp
//     name: name,         // Event name
//     startTime: startTime,  // Event start time
//     endTime: endTime,      // Event end time
//     desc: desc,         // Event description
//     type: type,         // Event type (e.g., personal, work, etc.)
//     other date details  // Other event-specific details
// }
