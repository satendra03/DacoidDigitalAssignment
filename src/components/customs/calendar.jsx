import { useDateContext } from "@/context/DateContext";
import React, { useState } from "react";
import { Button } from "../ui/button";

const Calendar = ({ events = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { date, setDate } = useDateContext();

  const getDaysInMonth = (year, month) => {
    return new Array(new Date(year, month + 1, 0).getDate())
      .fill(null)
      .map((_, i) => new Date(year, month, i + 1));
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const getFirstDayOfMonth = () => {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
  };

  const hasEvent = (date) => {
    const dateStr = date.toLocaleDateString("en-US");
    return events.some((event) => event.fetchId === dateStr);
  };

  const handleDateClick = (date) => {
    setDate(date);
  };

  const days = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="calendar w-full max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <div className="calendar-header flex justify-between items-center mb-4">
        <Button
          onClick={handlePrevMonth}
          className="p-2 bg-gray-200 rounded text-black hover:bg-gray-300"
        >
          &lt;
        </Button>
        <h2 className="text-lg font-bold">
          {currentDate.toLocaleString("en-US", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <Button
          onClick={handleNextMonth}
          className="p-2 bg-gray-200 rounded text-black hover:bg-gray-300"
        >
          &gt;
        </Button>
      </div>

      <div className="calendar-grid grid grid-cols-7 gap-2">
        {week.map((day) => (
          <div
            key={day}
            className="text-center text-sm md:text-lg md:font-semibold"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: getFirstDayOfMonth() }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(day)}
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
                  ? "bg-orange-300"
                  : ""
              }
            `}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
