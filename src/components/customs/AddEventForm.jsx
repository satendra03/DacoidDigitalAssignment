import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEventContext } from "@/context/EventContext";
import { useDateContext } from "@/context/DateContext";
import toast from "react-hot-toast";

function AddEventForm() {
  const { date } = useDateContext();
  const { events, setEvents, addEvent, selectedEvent, setSelectedEvent } =
    useEventContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedType, setSelectedType] = useState("work");

  const [startError, setStartError] = useState("");
  const [endError, setEndError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedEvent) {
      setName(selectedEvent.name || "");
      setDescription(selectedEvent.description || "");
      setStartTime(selectedEvent.startTime || "");
      setEndTime(selectedEvent.endTime || "");
      setSelectedType(selectedEvent.type || "work");
      setIsOpen(true);
    }
  }, [selectedEvent]);

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    if (endTime && newStartTime >= endTime) {
      setStartError("Start time must be less than end time.");
    } else {
      setStartError("");
    }
    setStartTime(newStartTime);
  };

  const handleEndTimeChange = (e) => {
    const newEndTime = e.target.value;
    if (startTime && newEndTime <= startTime) {
      setEndError("End time must be greater than start time.");
    } else {
      setEndError("");
    }
    setEndTime(newEndTime);
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
    setStartTime("");
    setEndTime("");
    setSelectedType("work");
    setSelectedEvent(null);
    setIsOpen(false);
  };

  const onSubmit = () => {
    if (!name) {
      toast.error("Name is required.");
      return;
    }
    if (!startTime) {
      toast.error("Start time is required.");
      return;
    }
    if (!endTime) {
      toast.error("End time is required.");
      return;
    }
    if (startError || endError) {
      toast.error("Start time must be before end time.");
      return;
    }

    if (selectedEvent) {
      const updatedEvent = {
        ...selectedEvent,
        name,
        description,
        startTime,
        endTime,
        type: selectedType,
      };

      const updatedEvents = events.map((event) =>
        event.id === selectedEvent.id ? updatedEvent : event
      );

      setEvents(updatedEvents);

      toast.success("Event updated successfully.");
    } else {
      const newEventStartTime = startTime;
      const newEventEndTime = endTime;
      const newEventDate = date.toLocaleDateString();

      const eventExists = events.some((event) => {
        if (event.fetchId !== newEventDate) return false;
        const existingStartTime = new Date(`${newEventDate} ${event.startTime}`);
        const existingEndTime = new Date(`${newEventDate} ${event.endTime}`);
        const newStartTime = new Date(`${newEventDate} ${newEventStartTime}`);
        const newEndTime = new Date(`${newEventDate} ${newEventEndTime}`);
        return (
          (newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
          (newEndTime > existingStartTime && newEndTime <= existingEndTime) || 
          (newStartTime <= existingStartTime && newEndTime >= existingEndTime)
        );

      });
      if (eventExists) {
        toast.error("Event time conflicts with an existing event.");
        return;
      }

      const newEvent = {
        name,
        description,
        startTime,
        endTime,
        type: selectedType,
        id: Date.now(),
        fetchId: date.toLocaleDateString(),
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      };
      addEvent(newEvent);
      toast.success("Event added successfully.");
    }

    handleCancel();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="" onClick={() => setIsOpen(true)}>
          {`Add Event for ${date.toDateString()}`}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {selectedEvent ? "Update Event" : "Add New Event"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {selectedEvent
              ? "Update the event details below."
              : "Please fill out the form to add a new event."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Event Name</Label>
            <Input
              id="name"
              placeholder="Event Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="desc">Event Description</Label>
            <Input
              id="desc"
              placeholder="Event Description (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              required
              value={startTime}
              onChange={handleStartTimeChange}
            />
            {startError && <p className="text-red-500">{startError}</p>}
          </div>

          <div>
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="time"
              required
              value={endTime}
              onChange={handleEndTimeChange}
            />
            {endError && <p className="text-red-500">{endError}</p>}
          </div>

          <div>
            <Label htmlFor="type">Event Type</Label>
            <Select
              id="type"
              value={selectedType}
              onValueChange={(value) => setSelectedType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onSubmit}>
              {selectedEvent ? "Update" : "Submit"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AddEventForm;
