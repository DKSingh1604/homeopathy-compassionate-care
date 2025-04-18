
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Messages = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    // TODO: Implement sending message to backend (Supabase), with realtime or email notification
    alert("Message sent (functionality coming soon).");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start py-12 px-6 sm:px-12 lg:px-20">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-900">Patient Messaging</h1>

        <textarea
          className="w-full rounded-md border border-input p-3 mb-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          rows={6}
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-label="Patient message"
        />

        <Button onClick={handleSend} className="w-full" disabled={!message.trim()}>
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default Messages;
