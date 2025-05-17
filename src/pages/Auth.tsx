
import * as React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";
import { Check, Loader2 } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
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

  const formatPhoneNumber = (phone: string) => {
    // Ensure phone number has country code
    if (!phone.startsWith('+')) {
      // Default to India code if none provided
      return '+91' + phone.replace(/^0/, '');
    }
    return phone;
  };

  const handleSendPhoneOtp = async () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      
      // Log the formatted phone for debugging
      console.log("Sending OTP to:", formattedPhone);
      
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
      console.error("Phone OTP error:", error);
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
    if (!otpCode || otpCode.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit OTP code",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      
      console.log("Verifying OTP for:", formattedPhone, "Code:", otpCode);
      
      const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otpCode,
        type: "sms",
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Phone number verified successfully",
      });
      
      if (data.session) {
        navigate("/");
      }
    } catch (error: any) {
      console.error("OTP verification error:", error);
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
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setAuthMethod("email")}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
                  authMethod === "email"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod("phone")}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
                  authMethod === "phone"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Phone
              </button>
            </div>

            {authMethod === "email" ? (
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
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoginMode ? "Sign in" : "Sign up"}
                </Button>

                <div className="flex items-center justify-center space-x-2">
                  <span className="border-b border-gray-300 w-full" />
                  <span className="text-sm text-gray-500">Or</span>
                  <span className="border-b border-gray-300 w-full" />
                </div>

                <Button
                  type="button"
                  onClick={handleGoogleSignIn}
                  variant="outline"
                  disabled={loading}
                  className="w-full"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign in with Google
                </Button>
              </div>
            ) : (
              <div>
                {!otpSent ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <div className="flex mt-1">
                        <div className="flex items-center bg-background border border-input rounded-l-md px-3 text-sm text-gray-600">
                          +91
                        </div>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          placeholder="9876543210"
                          value={phoneNumber.replace(/^\+91/, '')}
                          onChange={(e) => {
                            // Only allow numbers
                            const value = e.target.value.replace(/\D/g, '');
                            setPhoneNumber(value);
                          }}
                          className="rounded-l-none flex-1"
                          maxLength={10}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Enter 10 digit number without country code</p>
                    </div>
                    <Button
                      type="button"
                      onClick={handleSendPhoneOtp}
                      disabled={loading || !phoneNumber || phoneNumber.length < 10}
                      className="w-full"
                    >
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Send OTP
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="otpCode" className="mb-2 block">Enter 6-digit OTP sent to +91{phoneNumber}</Label>
                      <InputOTP 
                        value={otpCode}
                        onChange={(value) => setOtpCode(value)}
                        maxLength={6}
                        className="justify-center gap-2"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    <div className="flex space-x-3">
                      <Button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        variant="outline"
                        disabled={loading}
                        className="flex-1"
                      >
                        Change Number
                      </Button>
                      <Button
                        type="button"
                        onClick={handleVerifyPhoneOtp}
                        disabled={loading || otpCode.length !== 6}
                        className="flex-1"
                      >
                        {loading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="mr-2 h-4 w-4" />
                        )}
                        Verify
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
