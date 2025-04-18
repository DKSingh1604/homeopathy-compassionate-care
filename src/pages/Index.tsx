
import * as React from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";

const Index = () => {
  const [session, setSession] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      if (!data.session) {
        navigate("/auth");
      }
    };
    getSession();

    // Store subscription object
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => {
      // Safely unsubscribe if subscription exists
      if (data && typeof data.subscription?.unsubscribe === "function") {
        data.subscription.unsubscribe();
      }
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full py-12 text-gray-900">
        <h1 className="text-4xl font-bold mb-6 text-center">Dr. Harpal Singh – Homeopathy with Care</h1>
        <section className="bg-soft-blue p-8 rounded-lg shadow-lg bg-[#D3E4FD]">
          <h2 className="text-2xl font-semibold mb-4">About Dr. Harpal Singh</h2>
          <p className="mb-4">
            Welcome to the compassionate care of Dr. Harpal Singh, a dedicated homeopathic physician practicing from the comfort of his home. With extensive education and years of experience, Dr. Singh brings a personal touch to healthcare, focusing on your holistic well-being.
          </p>
          <p className="mb-4">
            Dr. Singh holds a degree in Homeopathy and has served numerous patients with empathy and professionalism. His gentle approach aims to treat not just the illness but the person as a whole.
          </p>
          <p className="mb-6">
            We invite you to explore services, schedule appointments, and reach out with any questions. Your health and comfort are our priority.
          </p>
          {!session && (
            <div className="text-center">
              <Link
                to="/auth"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90"
              >
                Login or Sign Up
              </Link>
            </div>
          )}
        </section>
        {session && (
          <nav className="mt-10 flex justify-center space-x-6 text-lg font-medium text-primary-foreground">
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
            <Link to="/admin" className="hover:underline">
              Admin
            </Link>
            <Link to="/messages" className="hover:underline">
              Messages
            </Link>
            <Link to="/appointments" className="hover:underline">
              Appointments
            </Link>
          </nav>
        )}
        {/* Testimonials Section */}
        <section className="mt-14 bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Patient Testimonials</h2>
          <article className="mb-4">
            <blockquote className="italic text-gray-700">
              &quot;Dr. Harpal Singh genuinely cares for his patients. My recovery was smooth and complete.&quot;
            </blockquote>
            <p className="text-right font-semibold mt-2">- Patient A</p>
          </article>
          <article className="mb-4">
            <blockquote className="italic text-gray-700">
              &quot;A compassionate and knowledgeable homeopath. Highly recommended!&quot;
            </blockquote>
            <p className="text-right font-semibold mt-2">- Patient B</p>
          </article>
          <p className="text-center text-gray-600 mt-2">More reviews coming soon...</p>
        </section>
      </div>
    </div>
  );
};

export default Index;
