
import * as React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Appointments = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center py-12 px-6 sm:px-12 lg:px-20">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-semibold mb-6 text-center">Appointment Booking</h1>
        <p className="text-center text-muted-foreground">
          Appointment booking functionality is coming soon. You will be able to book appointments manually or receive automated confirmations.
        </p>
      </div>
    </div>
  );
};

export default Appointments;
