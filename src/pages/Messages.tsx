
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SendIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const Messages = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    // TODO: Implement sending message to backend (Supabase), with realtime or email notification
    alert("Message sent (functionality coming soon).");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-start py-12 px-6 sm:px-12 lg:px-20">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-md w-full bg-card border border-border rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold mb-6 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Patient Messaging</h1>

        <Textarea
          className="w-full rounded-md border border-input bg-secondary/30 p-3 mb-4 focus-visible:ring-primary"
          rows={6}
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-label="Patient message"
        />

        <Button 
          onClick={handleSend} 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2" 
          disabled={!message.trim()}
        >
          <SendIcon className="h-4 w-4" />
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default Messages;
