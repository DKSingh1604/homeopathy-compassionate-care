
import * as React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/");
      }
    };
    getSession();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => {
      if (data && typeof data.subscription?.unsubscribe === "function") {
        data.subscription.unsubscribe();
      }
    };
  }, [navigate]);

  const handleEmailPasswordAuth = async () => {
    setLoading(true);
    try {
      let data, error;
      if (isLoginMode) {
        ({ data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        }));
      } else {
        ({ data, error } = await supabase.auth.signUp({
          email,
          password,
        }));
      }
      if (error) throw error;
      toast({
        title: "Success",
        description: isLoginMode
          ? "Logged in successfully"
          : "Signup successful! Check your email for a confirmation link.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        }
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleSendPhoneOtp = async () => {
    setLoading(true);
    try {
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });
      if (error) throw error;
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "Check your phone for the verification code.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhoneOtp = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`,
        token: otpCode,
        type: "sms",
      });
      if (error) throw error;
      toast({
        title: "Success",
        description: "Phone number verified successfully",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLoginMode ? "Sign in to your account" : "Create an account"}
        </h2>
        <button
          onClick={() => setIsLoginMode(!isLoginMode)}
          className="mt-2 text-center text-sm text-blue-600 hover:underline w-full"
          type="button"
        >
          {isLoginMode ? "New user? Create an account" : "Have an account? Sign in"}
        </button>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-50 px-6 py-8 rounded-lg shadow-md sm:px-10">
          <div className="space-y-6">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">
                Password {isLoginMode ? "" : "(min 6 characters)"}
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={isLoginMode ? "current-password" : "new-password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                minLength={6}
              />
            </div>
            <Button
              type="button"
              onClick={handleEmailPasswordAuth}
              disabled={loading}
              className="w-full"
            >
              {isLoginMode ? "Sign in" : "Sign up"}
            </Button>

            <div className="flex items-center justify-center space-x-2">
              <span className="border-b border-gray-300 w-full" />
              <span className="text-sm text-gray-500">Or continue with</span>
              <span className="border-b border-gray-300 w-full" />
            </div>

            <Button
              type="button"
              onClick={handleGoogleSignIn}
              variant="outline"
              disabled={loading}
              className="w-full"
            >
              Sign in with Google
            </Button>

            {!otpSent ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phoneNumber">Phone Number (with country code)</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="+1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleSendPhoneOtp}
                  disabled={loading || !phoneNumber}
                  className="w-full"
                >
                  Send SMS Code
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="otpCode">Enter SMS verification code</Label>
                  <Input
                    id="otpCode"
                    name="otpCode"
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="mt-1"
                    maxLength={6}
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleVerifyPhoneOtp}
                  disabled={loading || otpCode.length === 0}
                  className="w-full"
                >
                  Verify Phone Number
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
