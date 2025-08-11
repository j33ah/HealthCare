import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Users,
  Heart,
  AlertTriangle,
  Clock,
  Phone,
  ArrowLeft,
  CheckCircle,
  XCircle,
  MessageSquare,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function CaregiverDashboard() {
  const [patients] = useState([
    {
      id: 1,
      name: "Margaret Johnson",
      age: 78,
      lastActive: "2 minutes ago",
      medicationCompliance: 95,
      missedMedications: 0,
      upcomingAppointments: 2,
      recentActivity: "Took morning medications",
      healthStatus: "Good",
      emergencyContacts: ["Dr. Smith", "Daughter: Sarah"],
    },
  ]);

  const [recentAlerts] = useState([
    {
      id: 1,
      type: "medication",
      message: "Margaret took her morning blood pressure medication",
      time: "8:15 AM",
      severity: "info",
    },
    {
      id: 2,
      type: "appointment",
      message: "Reminder: Cardiology appointment tomorrow at 10:30 AM",
      time: "Yesterday",
      severity: "warning",
    },
    {
      id: 3,
      type: "emergency",
      message: "Emergency button test completed successfully",
      time: "2 days ago",
      severity: "success",
    },
  ]);

  const sendMessage = (patientId: number) => {
    alert("Message sent to patient: 'How are you feeling today?'");
  };

  const callPatient = (patientId: number) => {
    alert("Calling patient...");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/">
          <Button variant="outline" size="lg" className="senior-button">
            <ArrowLeft className="h-6 w-6 mr-2" />
            Back to Home
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Caregiver Dashboard
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Monitor and support your loved ones
          </p>
        </div>
      </div>

      {/* Patient Overview */}
      <div className="grid gap-8">
        {patients.map((patient) => (
          <Card key={patient.id} className="border-2">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center justify-between">
                <span className="flex items-center">
                  <Users className="h-8 w-8 mr-4 text-healthcare-primary" />
                  {patient.name}, {patient.age}
                </span>
                <Badge
                  variant={
                    patient.healthStatus === "Good" ? "default" : "destructive"
                  }
                  className="text-lg px-4 py-2"
                >
                  {patient.healthStatus}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-healthcare-success">
                      {patient.medicationCompliance}%
                    </div>
                    <div className="text-lg text-muted-foreground">
                      Medication Compliance
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-healthcare-primary">
                      {patient.missedMedications}
                    </div>
                    <div className="text-lg text-muted-foreground">
                      Missed This Week
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-healthcare-secondary">
                      {patient.upcomingAppointments}
                    </div>
                    <div className="text-lg text-muted-foreground">
                      Upcoming Appointments
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-lg font-bold text-green-600">
                      Active
                    </div>
                    <div className="text-base text-muted-foreground">
                      {patient.lastActive}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Alert className="border-2 border-healthcare-primary mb-6">
                <Activity className="h-6 w-6" />
                <AlertDescription className="ml-4">
                  <div className="text-xl font-semibold">Recent Activity</div>
                  <div className="text-lg">{patient.recentActivity}</div>
                </AlertDescription>
              </Alert>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <Button
                  onClick={() => callPatient(patient.id)}
                  className="senior-button bg-healthcare-primary hover:bg-healthcare-primary/90 flex-1"
                >
                  <Phone className="h-6 w-6 mr-3" />
                  Call Patient
                </Button>
                <Button
                  onClick={() => sendMessage(patient.id)}
                  className="senior-button bg-healthcare-secondary hover:bg-healthcare-secondary/90 flex-1"
                >
                  <MessageSquare className="h-6 w-6 mr-3" />
                  Send Message
                </Button>
              </div>

              {/* Emergency Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {patient.emergencyContacts.map((contact, index) => (
                      <div key={index} className="text-lg">
                        • {contact}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Alerts */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <AlertTriangle className="h-6 w-6 mr-3 text-yellow-600" />
            Recent Alerts & Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <Alert
                key={alert.id}
                className={`border-2 ${
                  alert.severity === "success"
                    ? "border-healthcare-success"
                    : alert.severity === "warning"
                      ? "border-yellow-500"
                      : "border-healthcare-primary"
                }`}
              >
                <div className="flex items-center">
                  {alert.severity === "success" ? (
                    <CheckCircle className="h-6 w-6 text-healthcare-success" />
                  ) : alert.severity === "warning" ? (
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  ) : (
                    <Clock className="h-6 w-6 text-healthcare-primary" />
                  )}
                </div>
                <AlertDescription className="ml-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-lg font-semibold">
                        {alert.message}
                      </div>
                      <div className="text-base text-muted-foreground">
                        {alert.time}
                      </div>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Actions */}
      <Card className="mt-8 border-4 border-healthcare-emergency">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center text-healthcare-emergency">
            <AlertTriangle className="h-6 w-6 mr-3" />
            Emergency Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="emergency-button bg-healthcare-emergency hover:bg-healthcare-emergency/90">
              <Phone className="h-8 w-8 mr-4" />
              Call Emergency Services
            </Button>
            <Button className="emergency-button bg-red-600 hover:bg-red-700">
              <AlertTriangle className="h-8 w-8 mr-4" />
              Alert All Caregivers
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
