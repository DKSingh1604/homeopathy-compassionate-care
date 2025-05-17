
import * as React from "react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, Edit } from "lucide-react";
import { toast } from "sonner";

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone_number: string | null;
  created_at: string;
  updated_at: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate("/auth");
          return;
        }
        
        setUser(user);
        
        // Fetch profile data
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) {
          console.error("Error fetching profile:", error);
          toast.error("Failed to load profile data");
        } else if (profileData) {
          setProfile(profileData);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while loading your profile");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <div className="flex items-center space-x-4">
            <Link to="/" className="font-medium text-primary">Home</Link>
            <h1 className="text-xl font-semibold">Your Profile</h1>
          </div>
          <ThemeToggle />
        </nav>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <Card className="shadow-md">
              <CardHeader className="flex flex-col items-center space-y-4 border-b pb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile?.avatar_url || ""} />
                  <AvatarFallback className="text-lg">
                    {getInitials(profile?.full_name || user?.email || "")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <CardTitle className="text-2xl">
                    {profile?.full_name || "User"}
                  </CardTitle>
                  <CardDescription>
                    {user?.email}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                      <p className="font-medium">{profile?.phone_number || "Not provided"}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">
                      {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "Unknown"}
                    </p>
                  </div>
                  
                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 w-full"
                      onClick={() => toast.info("Edit profile feature coming soon!")}
                    >
                      <Edit className="h-4 w-4" /> 
                      Edit Profile
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex items-center gap-2 w-full"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4" /> 
                      Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
