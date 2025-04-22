
import * as React from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const [session, setSession] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
    <>
      {/* Fixed top bar with navigation and theme toggle */}
      {session && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12 sm:h-14">
            <ul className="flex space-x-6 text-sm sm:text-base font-medium overflow-x-auto no-scrollbar">
              <li>
                <Link
                  to="/contact"
                  className={`whitespace-nowrap hover:underline ${
                    location.pathname === "/contact"
                      ? "text-primary font-bold"
                      : "text-muted-foreground"
                  }`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className={`whitespace-nowrap hover:underline ${
                    location.pathname === "/admin"
                      ? "text-primary font-bold"
                      : "text-muted-foreground"
                  }`}
                >
                  Admin
                </Link>
              </li>
              <li>
                <Link
                  to="/messages"
                  className={`whitespace-nowrap hover:underline ${
                    location.pathname === "/messages"
                      ? "text-primary font-bold"
                      : "text-muted-foreground"
                  }`}
                >
                  Messages
                </Link>
              </li>
              <li>
                <Link
                  to="/appointments"
                  className={`whitespace-nowrap hover:underline ${
                    location.pathname === "/appointments"
                      ? "text-primary font-bold"
                      : "text-muted-foreground"
                  }`}
                >
                  Appointments
                </Link>
              </li>
            </ul>
            <div className="flex-shrink-0">
              <ThemeToggle />
            </div>
          </nav>
        </header>
      )}

      {/* Apply top padding to avoid hiding behind fixed header */}
      <main
        className={`min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 ${
          session ? "pt-14 sm:pt-16" : ""
        }`}
      >
        <div className="max-w-4xl w-full py-12">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Dr. Harpal Singh – Homeopathy with Care
          </h1>
          <section className="bg-primary/10 p-8 rounded-lg shadow-lg dark:bg-primary/5">
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
            // The nav below removed because moved to fixed header
            null
          )}
          {/* Testimonials Section */}
          <section className="mt-14 bg-card text-card-foreground p-6 rounded-lg shadow-md border border-border max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">Patient Testimonials</h2>
            <article className="mb-4">
              <blockquote className="italic text-muted-foreground">
                &quot;Dr. Harpal Singh genuinely cares for his patients. My recovery was smooth and complete.&quot;
              </blockquote>
              <p className="text-right font-semibold mt-2">- Patient A</p>
            </article>
            <article className="mb-4">
              <blockquote className="italic text-muted-foreground">
                &quot;A compassionate and knowledgeable homeopath. Highly recommended!&quot;
              </blockquote>
              <p className="text-right font-semibold mt-2">- Patient B</p>
            </article>
            <p className="text-center text-muted-foreground mt-2">More reviews coming soon...</p>
          </section>
        </div>
      </main>
    </>
  );
};

export default Index;

