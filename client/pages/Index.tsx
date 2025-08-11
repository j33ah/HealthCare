import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  AlertCircle,
  Phone,
  Heart,
  Pill,
  MapPin,
  Users,
  Bell,
  Settings,
  Moon,
  Sun
} from "lucide-react";

export default function Index() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Get user's location for emergency services
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("Location access denied");
        }
      );
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleEmergencyCall = () => {
    // In a real app, this would trigger emergency services and notify caregivers
    const message = location 
      ? `Emergency! Location: ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`
      : "Emergency! Location not available";
    
    alert(message);
    // Here you would:
    // 1. Call emergency services
    // 2. Send SMS to emergency contacts
    // 3. Send location to caregivers
    // 4. Log the emergency event
  };

  // Mock data for demonstration
  const upcomingMedications = [
    { name: "Blood Pressure Medication", time: "2:00 PM", taken: false },
    { name: "Vitamin D", time: "6:00 PM", taken: false },
    { name: "Heart Medication", time: "8:00 PM", taken: false }
  ];

  const todaysAppointments = [
    { doctor: "Dr. Smith", time: "10:30 AM", type: "Cardiology" },
    { doctor: "Dr. Johnson", time: "3:00 PM", type: "General Check-up" }
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            HealthCare Companion
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Your trusted medical reminder and support system
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-bold">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-lg text-muted-foreground">
              {currentTime.toLocaleDateString()}
            </div>
          </div>
          <Button 
            variant="outline" 
            size="lg"
            onClick={toggleDarkMode}
            className="senior-button"
          >
            {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Emergency SOS Button */}
      <Card className="mb-8 border-4 border-healthcare-emergency">
        <CardContent className="p-6 text-center">
          <Button 
            onClick={handleEmergencyCall}
            className="emergency-button bg-healthcare-emergency hover:bg-healthcare-emergency/90 text-healthcare-emergency-foreground w-full"
          >
            <AlertCircle className="h-8 w-8 mr-4" />
            EMERGENCY SOS
            <Phone className="h-8 w-8 ml-4" />
          </Button>
          <p className="text-lg mt-4 text-muted-foreground">
            Press for immediate emergency assistance
            {location && (
              <span className="flex items-center justify-center mt-2">
                <MapPin className="h-5 w-5 mr-2" />
                Location services active
              </span>
            )}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Medication Reminders */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <Pill className="h-8 w-8 text-healthcare-primary mr-4" />
              <h2 className="text-3xl font-bold">Today's Medications</h2>
            </div>
            
            <div className="space-y-4">
              {upcomingMedications.map((med, index) => (
                <Alert key={index} className="border-2">
                  <Clock className="h-6 w-6" />
                  <AlertDescription className="ml-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xl font-semibold">{med.name}</div>
                        <div className="text-lg text-muted-foreground">Due at {med.time}</div>
                      </div>
                      <Button 
                        className="senior-button bg-healthcare-success hover:bg-healthcare-success/90"
                        disabled={med.taken}
                      >
                        {med.taken ? "✓ Taken" : "Mark Taken"}
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>

            <Button className="senior-button bg-healthcare-primary hover:bg-healthcare-primary/90 w-full mt-6">
              <Pill className="h-6 w-6 mr-3" />
              View All Medications
            </Button>
          </CardContent>
        </Card>

        {/* Appointments */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <Calendar className="h-8 w-8 text-healthcare-secondary mr-4" />
              <h2 className="text-3xl font-bold">Today's Appointments</h2>
            </div>
            
            <div className="space-y-4">
              {todaysAppointments.map((apt, index) => (
                <Alert key={index} className="border-2">
                  <Heart className="h-6 w-6" />
                  <AlertDescription className="ml-4">
                    <div className="text-xl font-semibold">{apt.doctor}</div>
                    <div className="text-lg text-muted-foreground">{apt.type}</div>
                    <div className="text-lg font-medium">{apt.time}</div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>

            <Button className="senior-button bg-healthcare-secondary hover:bg-healthcare-secondary/90 w-full mt-6">
              <Calendar className="h-6 w-6 mr-3" />
              Manage Appointments
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-healthcare-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Caregiver Dashboard</h3>
            <p className="text-lg text-muted-foreground mb-6">
              View health updates and manage care settings
            </p>
            <Button className="senior-button bg-healthcare-primary hover:bg-healthcare-primary/90 w-full">
              Access Dashboard
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Bell className="h-12 w-12 text-healthcare-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Reminder Settings</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Customize your medication and appointment alerts
            </p>
            <Button className="senior-button bg-healthcare-secondary hover:bg-healthcare-secondary/90 w-full">
              Manage Reminders
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">App Settings</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Adjust text size, language, and preferences
            </p>
            <Button className="senior-button bg-secondary hover:bg-secondary/90 w-full">
              Open Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <div className="flex justify-center items-center gap-2 text-lg text-muted-foreground">
          <Heart className="h-6 w-6 text-healthcare-emergency" />
          <span>Your health and safety are our priority</span>
          <Heart className="h-6 w-6 text-healthcare-emergency" />
        </div>
        <p className="text-lg text-muted-foreground mt-2">
          Available 24/7 for emergency assistance
        </p>
      </div>
    </div>
  );
}
