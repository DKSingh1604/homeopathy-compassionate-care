
import * as React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CalendarIcon } from "lucide-react";

const Appointments = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center py-12 px-6 sm:px-12 lg:px-20">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-2xl w-full bg-card border border-border rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-primary/10 p-3 rounded-full">
            <CalendarIcon className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-semibold mb-3 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Appointment Booking</h1>
        <p className="text-center text-muted-foreground">
          Appointment booking functionality is coming soon. You will be able to book appointments manually or receive automated confirmations.
        </p>
        <div className="mt-6 p-4 bg-secondary rounded-md">
          <p className="text-sm text-secondary-foreground text-center">
            We're working hard to bring you a seamless appointment booking experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
