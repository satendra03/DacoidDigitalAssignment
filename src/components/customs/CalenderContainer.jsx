import React from "react";
import { useDateContext } from "@/context/DateContext";
import AddEventForm from "./AddEventForm";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useEventContext } from "@/context/EventContext";
import Calendar from "./calendar";

function CalenderContainer() {
  const { date } = useDateContext();

  // Function to get the name of the month based on its number
  const getMonthNames = (num) => {
    switch (num) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        return "";
    }
  };

  const { events } = useEventContext();
  const downloadEvents = () => {
    // Filter events to include only those for the current month
    const filteredEvents = events.filter(
      (event) => event.month === date.getMonth()
    );

    if (filteredEvents.length === 0) {
      toast.error("No events found");
      return;
    }

    // Grouping events by date (fetchId is used as the date identifier)
    const groupedEvents = filteredEvents.reduce((acc, event) => {
      const eventDate = event.fetchId;

      if (!acc[eventDate]) {
        acc[eventDate] = [];
      }

      // Pushing event details into the group
      acc[eventDate].push({
        name: event.name,
        description: event.desc,
        startTime: event.startTime,
        endTime: event.endTime,
        type: event.type,
      });

      return acc;
    }, {});

    // Sorting the events first by date and then by start time
    const sortedGroupedEvents = Object.keys(groupedEvents)
      .sort((a, b) => {
        return new Date(a) - new Date(b); // Sorting by date
      })
      .reduce((acc, date) => {
        acc[date] = groupedEvents[date].sort((a, b) => {
          const timeA = new Date(`1970-01-01T${a.startTime}:00Z`);
          const timeB = new Date(`1970-01-01T${b.startTime}:00Z`);
          return timeA - timeB; // Sorting by start time
        });
        return acc;
      }, {});

      // Creating a Blob from the sorted event data to facilitate file download
    const blob = new Blob([JSON.stringify(sortedGroupedEvents, null, 2)], {
      type: "application/json;charset=utf-8;",
    });

    // Creating a download link element and setting its attributes
    const downloadButton = document.createElement("a");
    const url = URL.createObjectURL(blob);
    downloadButton.setAttribute("href", url);
    downloadButton.setAttribute(
      "download",
      `events_${getMonthNames(date.getMonth())}.json`
    );
    downloadButton.style.display = "none";
    document.body.appendChild(downloadButton);

    // Simulating a click event on the download link element to trigger the download
    downloadButton.click();

    // Removing the download link element from the DOM after it's triggered
    document.body.removeChild(downloadButton);
    URL.revokeObjectURL(url);

    toast.success("Downloaded Successfully");
  };

  return (
    <>
      <div className="calender rounded-lg border-2 shadow-md">
        {/* Calendar Component displaying events */}
        <Calendar events={events} />
      </div>
      <div className="date-info mt-5 flex flex-col text-muted-foreground gap-4 text-center rounded-lg">
        {/* Add Event Form */}
        <AddEventForm />
        {/* Button to download events of the current month */}
        <Button onClick={() => downloadEvents()}>
          Download events of {getMonthNames(date.getMonth())}
        </Button>
      </div>
    </>
  );
}

export default CalenderContainer;
