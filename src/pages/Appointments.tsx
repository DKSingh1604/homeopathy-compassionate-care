
import * as React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CalendarIcon, ClockIcon, CheckCircleIcon, ListIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Appointments = () => {
  const [activeTab, setActiveTab] = React.useState("upcoming");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Fixed header with tabs */}
      <div className="sticky top-0 z-10 w-full bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Appointments
          </h1>
          <ThemeToggle />
        </div>
        
        <div className="container mx-auto px-4 pb-4">
          <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="upcoming" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Upcoming</span>
              </TabsTrigger>
              <TabsTrigger value="past" className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Past</span>
              </TabsTrigger>
              <TabsTrigger value="confirmed" className="flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Confirmed</span>
              </TabsTrigger>
              <TabsTrigger value="all" className="flex items-center gap-2">
                <ListIcon className="h-4 w-4" />
                <span className="hidden sm:inline">All</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="upcoming" className="mt-0">
            <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg shadow-lg p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CalendarIcon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-3 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Upcoming Appointments
              </h2>
              <p className="text-center text-muted-foreground">
                Your upcoming appointments will be shown here. You will be able to book appointments manually or receive automated confirmations.
              </p>
              <div className="mt-6 p-4 bg-secondary rounded-md">
                <p className="text-sm text-secondary-foreground text-center">
                  We're working hard to bring you a seamless appointment booking experience.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="mt-0">
            <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg shadow-lg p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <ClockIcon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-3 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Past Appointments
              </h2>
              <p className="text-center text-muted-foreground">
                Your appointment history will be displayed here. Track your previous visits and consultations.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="confirmed" className="mt-0">
            <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg shadow-lg p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CheckCircleIcon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-3 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Confirmed Appointments
              </h2>
              <p className="text-center text-muted-foreground">
                View all your confirmed appointments here. These are appointments that have been approved by Dr. Harpal Singh.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="mt-0">
            <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg shadow-lg p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <ListIcon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-3 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                All Appointments
              </h2>
              <p className="text-center text-muted-foreground">
                A comprehensive view of all your appointments, including upcoming, past, and confirmed appointments.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Appointments;
