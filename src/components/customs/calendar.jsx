import { useDateContext } from "@/context/DateContext";
import React, { useState } from "react";
import { Button } from "../ui/button";

const Calendar = ({ events = [] }) => {
  // Local state for current date in the calendar
  const [currentDate, setCurrentDate] = useState(new Date());

  // Accessing date and setDate from context
  const { date, setDate } = useDateContext();

  // Function to get all the days in a month
  const getDaysInMonth = (year, month) => {
    return new Array(new Date(year, month + 1, 0).getDate()) // Get the number of days in the month
      .fill(null)
      .map((_, i) => new Date(year, month, i + 1)); // Map over the number of days to create an array of Date objects
  };

  // Handling the previous month's navigation
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    ); // Set the current date to the first day of the previous month
  };

  // Handling the next month's navigation
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    ); // Set the current date to the first day of the next month
  };

  // Get the first day of the current month to align the calendar properly
  const getFirstDayOfMonth = () => {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay(); // Get the day of the week for the first day of the month
  };

  // Check if a specific day has an event
  const hasEvent = (date) => {
    const dateStr = date.toLocaleDateString("en-US");
    return events.some((event) => event.fetchId === dateStr); // Check if any event matches the formatted date
  };

  // Handle click on a specific date
  const handleDateClick = (day) => {
    setDate(day); // Set the clicked date to the context (global state)
  };

  // Get all the days in the current month
  const days = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  // Array for the weekdays
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="calendar w-full max-w-md mx-auto p-4 border rounded-lg shadow-md">
      {/* Calendar Header */}
      <div className="calendar-header flex justify-between items-center mb-4">
        {/* Previous month button */}
        <Button
          onClick={handlePrevMonth}
          className="p-2 bg-gray-200 rounded text-black hover:bg-gray-300"
        >
          &lt;
        </Button>

        {/* Display current month and year */}
        <h2 className="text-lg font-bold">
          {currentDate.toLocaleString("en-US", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>

        {/* Next month button */}
        <Button
          onClick={handleNextMonth}
          className="p-2 bg-gray-200 rounded text-black hover:bg-gray-300"
        >
          &gt;
        </Button>
      </div>

      {/* Calendar grid displaying days of the week */}
      <div className="calendar-grid grid grid-cols-7 gap-2">
        {week.map((day) => (
          <div
            key={day}
            className="text-center text-sm md:text-lg md:font-semibold"
          >
            {day}
          </div>
        ))}

         {/* Empty cells before the first day of the month to align the calendar */}
        {Array.from({ length: getFirstDayOfMonth() }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Render each day of the month */}
        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(day)} // Click handler for selecting a date
            className={`text-center p-2 rounded cursor-pointer transition
              ${
                date &&
                day.toLocaleDateString() === date.toLocaleDateString() &&
                "bg-black text-white"
              }
              ${
                day.toLocaleDateString() === new Date().toLocaleDateString() &&
                new Date().toLocaleDateString() !== date.toLocaleDateString()
                  ? "bg-black/10 text-black"
                  : hasEvent(day)
                  ? "bg-orange-300"  // Highlight days with events
                  : ""
              }
            `}
          >
            {day.getDate()} {/* Display day number */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
