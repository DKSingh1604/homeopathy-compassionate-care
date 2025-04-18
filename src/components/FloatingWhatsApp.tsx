
import * as React from "react";
import { whatsapp } from "lucide-react";

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp quick chat"
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-colors flex items-center justify-center"
    >
      <whatsapp className="w-6 h-6" />
    </a>
  );
};

export default FloatingWhatsApp;
