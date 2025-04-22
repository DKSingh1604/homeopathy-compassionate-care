
import * as React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CalendarIcon, ClockIcon, CheckCircleIcon, ListIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

const Appointments = () => {
  const [activeTab, setActiveTab] = React.useState("upcoming");
  const isMobile = useIsMobile();

  const renderTabContent = (icon: React.ReactNode, title: string, description: string) => (
    <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-center mb-4 sm:mb-6">
        <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
          {icon}
        </div>
      </div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="text-center text-muted-foreground text-sm sm:text-base">
        {description}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pt-20 sm:pt-24">
      {/* Fixed header with tabs */}
      <div className="fixed top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-2 sm:px-4 flex items-center justify-between h-12 sm:h-14">
          <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Appointments
          </h1>
          <ThemeToggle />
        </div>

        <div className="container mx-auto px-2 sm:px-4 pb-2 sm:pb-4">
          <Tabs
            defaultValue="upcoming"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 gap-1 w-full">
              <TabsTrigger
                value="upcoming"
                className="flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-3 py-1"
              >
                <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className={isMobile ? "text-xs" : "text-sm"}>
                  {isMobile ? "Up" : "Upcoming"}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-3 py-1"
              >
                <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className={isMobile ? "text-xs" : "text-sm"}>
                  {isMobile ? "Past" : "Past"}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="confirmed"
                className="flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-3 py-1"
              >
                <CheckCircleIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className={isMobile ? "text-xs" : "text-sm"}>
                  {isMobile ? "Conf" : "Confirmed"}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className="flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-3 py-1"
              >
                <ListIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className={isMobile ? "text-xs" : "text-sm"}>
                  {isMobile ? "All" : "All"}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main content area with responsive padding */}
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8 mt-16 sm:mt-20">
        <Tabs
          defaultValue="upcoming"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsContent value="upcoming" className="mt-0">
            {renderTabContent(
              <CalendarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
              "Upcoming Appointments",
              "Your upcoming appointments will be shown here. You will be able to book appointments manually or receive automated confirmations."
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-0">
            {renderTabContent(
              <ClockIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
              "Past Appointments",
              "Your appointment history will be displayed here. Track your previous visits and consultations."
            )}
          </TabsContent>

          <TabsContent value="confirmed" className="mt-0">
            {renderTabContent(
              <CheckCircleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
              "Confirmed Appointments",
              "View all your confirmed appointments here. These are appointments that have been approved by Dr. Harpal Singh."
            )}
          </TabsContent>

          <TabsContent value="all" className="mt-0">
            {renderTabContent(
              <ListIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
              "All Appointments",
              "A comprehensive view of all your appointments, including upcoming, past, and confirmed appointments."
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Appointments;

