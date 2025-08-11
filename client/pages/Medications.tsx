import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Pill, 
  Plus, 
  Clock, 
  Calendar,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Medications() {
  const [medications] = useState([
    { 
      id: 1,
      name: "Lisinopril", 
      dosage: "10mg", 
      frequency: "Once daily",
      time: "8:00 AM",
      taken: true,
      nextDue: "Tomorrow 8:00 AM",
      instructions: "Take with water, before breakfast"
    },
    { 
      id: 2,
      name: "Metformin", 
      dosage: "500mg", 
      frequency: "Twice daily",
      time: "8:00 AM, 8:00 PM",
      taken: false,
      nextDue: "Today 8:00 PM",
      instructions: "Take with meals"
    },
    { 
      id: 3,
      name: "Vitamin D3", 
      dosage: "1000 IU", 
      frequency: "Once daily",
      time: "12:00 PM",
      taken: false,
      nextDue: "Today 12:00 PM",
      instructions: "Take with food"
    }
  ]);

  const markAsTaken = (id: number) => {
    // In a real app, this would update the medication status
    alert(`Medication marked as taken. Great job staying on track!`);
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
            My Medications
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Manage your daily medication schedule
          </p>
        </div>
      </div>

      {/* Today's Schedule */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center">
            <Clock className="h-8 w-8 mr-4 text-healthcare-primary" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {medications.map((med) => (
              <Alert key={med.id} className={`border-2 ${med.taken ? 'border-healthcare-success' : 'border-healthcare-primary'}`}>
                <div className="flex items-center">
                  {med.taken ? (
                    <CheckCircle className="h-8 w-8 text-healthcare-success" />
                  ) : (
                    <Pill className="h-8 w-8 text-healthcare-primary" />
                  )}
                </div>
                <AlertDescription className="ml-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="text-2xl font-bold">{med.name}</div>
                      <div className="text-xl text-muted-foreground">{med.dosage} - {med.frequency}</div>
                      <div className="text-lg font-medium mt-2">{med.instructions}</div>
                      <div className="flex items-center gap-4 mt-3">
                        <Badge variant={med.taken ? "default" : "destructive"} className="text-lg px-3 py-1">
                          {med.taken ? "✓ Taken" : `Due: ${med.time}`}
                        </Badge>
                        <span className="text-lg text-muted-foreground">
                          Next: {med.nextDue}
                        </span>
                      </div>
                    </div>
                    {!med.taken && (
                      <Button 
                        onClick={() => markAsTaken(med.id)}
                        className="senior-button bg-healthcare-success hover:bg-healthcare-success/90 ml-4"
                      >
                        <CheckCircle className="h-6 w-6 mr-2" />
                        Mark as Taken
                      </Button>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Plus className="h-6 w-6 mr-3 text-healthcare-primary" />
              Add New Medication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="senior-button bg-healthcare-primary hover:bg-healthcare-primary/90 w-full">
              <Plus className="h-6 w-6 mr-3" />
              Add Medication
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Calendar className="h-6 w-6 mr-3 text-healthcare-secondary" />
              Medication History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="senior-button bg-healthcare-secondary hover:bg-healthcare-secondary/90 w-full">
              <Calendar className="h-6 w-6 mr-3" />
              View History
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Important Reminders */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <AlertTriangle className="h-6 w-6 mr-3 text-yellow-600" />
            Important Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <AlertDescription className="ml-4">
                <div className="text-lg font-semibold">Never skip your heart medication</div>
                <div className="text-base">Always take Lisinopril at the same time each day</div>
              </AlertDescription>
            </Alert>
            <Alert className="border-blue-200 bg-blue-50">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
              <AlertDescription className="ml-4">
                <div className="text-lg font-semibold">Take Metformin with food</div>
                <div className="text-base">This helps prevent stomach upset</div>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
