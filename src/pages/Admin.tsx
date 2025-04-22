
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type TimeSlot = {
  start: string;
  end: string;
};

const Admin = () => {
  // Store time slots per day as strings representing intervals
  // Start and End times are strings in "HH:mm" format
  const [availability, setAvailability] = useState<Record<string, TimeSlot[]>>(() => {
    // Default empty availability for each day
    const defaultAvail: Record<string, TimeSlot[]> = {};
    daysOfWeek.forEach((day) => {
      defaultAvail[day] = [];
    });
    return defaultAvail;
  });

  const addTimeSlot = (day: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: [...prev[day], { start: "09:00", end: "17:00" }],
    }));
  };

  const updateTimeSlot = (day: string, index: number, field: keyof TimeSlot, value: string) => {
    setAvailability((prev) => {
      const updatedSlots = [...prev[day]];
      updatedSlots[index] = { ...updatedSlots[index], [field]: value };
      return { ...prev, [day]: updatedSlots };
    });
  };

  const removeTimeSlot = (day: string, index: number) => {
    setAvailability((prev) => {
      const updatedSlots = [...prev[day]];
      updatedSlots.splice(index, 1);
      return { ...prev, [day]: updatedSlots };
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-start py-12 px-6 sm:px-12 lg:px-20">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-semibold mb-6 text-center">Admin Panel - Weekly Availability</h1>

        {daysOfWeek.map((day) => (
          <section key={day} className="mb-6 border border-border rounded p-4 bg-card/30">
            <h2 className="text-xl font-medium mb-4">{day}</h2>

            {availability[day].map((slot, idx) => (
              <div key={idx} className="flex items-center space-x-4 mb-3">
                <label className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Start Time</span>
                  <input
                    type="time"
                    value={slot.start}
                    onChange={(e) => updateTimeSlot(day, idx, "start", e.target.value)}
                    className="mt-1 rounded border border-input bg-background px-2 py-1"
                  />
                </label>
                <label className="flex flex-col">
                  <span className="text-sm text-muted-foreground">End Time</span>
                  <input
                    type="time"
                    value={slot.end}
                    onChange={(e) => updateTimeSlot(day, idx, "end", e.target.value)}
                    className="mt-1 rounded border border-input bg-background px-2 py-1"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeTimeSlot(day, idx)}
                  className="text-destructive hover:text-destructive/80 font-semibold"
                  aria-label={`Remove time slot ${idx + 1} for ${day}`}
                >
                  Remove
                </button>
              </div>
            ))}

            <Button
              type="button"
              onClick={() => addTimeSlot(day)}
              variant="outline"
              className="mt-2"
            >
              Add Time Slot
            </Button>
          </section>
        ))}
        <div className="flex justify-center mt-6">
          <Button type="button" variant="default" disabled>
            Save changes (Coming Soon)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
