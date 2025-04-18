
import * as React from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start py-12 px-6 sm:px-12 lg:px-20">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-900">Contact Dr. Harpal Singh</h1>

        <p className="mb-8 text-gray-700 text-center">
          Reach out to us through your preferred method. We&apos;re here to assist you with care and responsiveness.
        </p>

        <div className="flex flex-col space-y-4">
          <Button
            asChild
            variant="outline"
            className="flex items-center justify-center gap-3"
          >
            <a href="https://wa.me/919412340490" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp chat">
              <MessageCircle className="w-5 h-5 text-green-600" />
              WhatsApp Chat
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="flex items-center justify-center gap-3"
          >
            <a href="mailto:drharpal@example.com" aria-label="Send Email">
              <Mail className="w-5 h-5 text-blue-600" />
              Email
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="flex items-center justify-center gap-3"
          >
            <a href="tel:+919412340490" aria-label="Call Phone">
              <Phone className="w-5 h-5 text-gray-700" />
              Phone Call
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

