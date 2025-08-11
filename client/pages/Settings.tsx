import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Settings as SettingsIcon,
  ArrowLeft,
  Volume2,
  Bell,
  Type,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { Language } from "@/lib/translations";

export default function Settings() {
  const { language, setLanguage, t } = useTranslation();
  const [fontSize, setFontSize] = useState([18]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const languageNames = {
    english: "English",
    spanish: "Español",
    french: "Français",
    chinese: "中文",
    arabic: "العربية"
  };
  const [notifications, setNotifications] = useState({
    medications: true,
    appointments: true,
    emergencies: true,
    reminders: true,
  });
  const [reminderSound, setReminderSound] = useState(true);
  const [vibration, setVibration] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const updateFontSize = (value: number[]) => {
    setFontSize(value);
    // In a real app, this would update the global font size
    document.documentElement.style.fontSize = `${value[0]}px`;
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/">
          <Button variant="outline" size="lg" className="senior-button">
            <ArrowLeft className="h-6 w-6 mr-2" />
            {t('backToHome')}
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {t('settings')}
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            {t('customizeExperience')}
          </p>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Display Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Type className="h-6 w-6 mr-3 text-healthcare-primary" />
              Display Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Font Size */}
            <div>
              <Label className="text-xl font-semibold">Text Size</Label>
              <div className="mt-4">
                <Slider
                  value={fontSize}
                  onValueChange={updateFontSize}
                  max={28}
                  min={14}
                  step={2}
                  className="w-full"
                />
                <div className="flex justify-between text-lg text-muted-foreground mt-2">
                  <span>Small</span>
                  <span>Medium</span>
                  <span>Large</span>
                  <span>Extra Large</span>
                </div>
              </div>
              <p
                className="text-lg mt-2"
                style={{ fontSize: `${fontSize[0]}px` }}
              >
                Sample text at selected size
              </p>
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-xl font-semibold">Dark Mode</Label>
                <p className="text-lg text-muted-foreground">
                  Easier on the eyes in low light
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Sun className="h-6 w-6" />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                  className="scale-150"
                />
                <Moon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Globe className="h-6 w-6 mr-3 text-healthcare-secondary" />
              Language & Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label className="text-xl font-semibold">
                Preferred Language
              </Label>
              <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                <SelectTrigger className="text-lg h-14 mt-3">
                  <SelectValue placeholder="Select Language">
                    {languageNames[language as keyof typeof languageNames]}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english" className="text-lg">
                    English
                  </SelectItem>
                  <SelectItem value="spanish" className="text-lg">
                    Español
                  </SelectItem>
                  <SelectItem value="french" className="text-lg">
                    Français
                  </SelectItem>
                  <SelectItem value="chinese" className="text-lg">
                    中文
                  </SelectItem>
                  <SelectItem value="arabic" className="text-lg">
                    العربية
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Bell className="h-6 w-6 mr-3 text-yellow-600" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Notification Types */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-xl font-semibold">
                    Medication Reminders
                  </Label>
                  <p className="text-lg text-muted-foreground">
                    Get notified when it's time for medications
                  </p>
                </div>
                <Switch
                  checked={notifications.medications}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, medications: checked })
                  }
                  className="scale-150"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-xl font-semibold">
                    Appointment Reminders
                  </Label>
                  <p className="text-lg text-muted-foreground">
                    Get notified about upcoming appointments
                  </p>
                </div>
                <Switch
                  checked={notifications.appointments}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      appointments: checked,
                    })
                  }
                  className="scale-150"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-xl font-semibold">
                    Emergency Alerts
                  </Label>
                  <p className="text-lg text-muted-foreground">
                    Important emergency notifications
                  </p>
                </div>
                <Switch
                  checked={notifications.emergencies}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, emergencies: checked })
                  }
                  className="scale-150"
                />
              </div>
            </div>

            {/* Sound & Vibration */}
            <div className="space-y-4 pt-6 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-xl font-semibold">Sound Alerts</Label>
                  <p className="text-lg text-muted-foreground">
                    Play sound for notifications
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Volume2 className="h-6 w-6" />
                  <Switch
                    checked={reminderSound}
                    onCheckedChange={setReminderSound}
                    className="scale-150"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-xl font-semibold">Vibration</Label>
                  <p className="text-lg text-muted-foreground">
                    Vibrate for important alerts
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Smartphone className="h-6 w-6" />
                  <Switch
                    checked={vibration}
                    onCheckedChange={setVibration}
                    className="scale-150"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Mail className="h-6 w-6 mr-3 text-healthcare-emergency" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground mb-6">
              Manage who gets notified in case of an emergency
            </p>
            <Button className="senior-button bg-healthcare-emergency hover:bg-healthcare-emergency/90 w-full">
              Manage Emergency Contacts
            </Button>
          </CardContent>
        </Card>

        {/* Save Settings */}
        <Card>
          <CardContent className="p-6 text-center">
            <Button className="senior-button bg-healthcare-primary hover:bg-healthcare-primary/90 w-full">
              <SettingsIcon className="h-6 w-6 mr-3" />
              Save All Settings
            </Button>
            <p className="text-lg text-muted-foreground mt-4">
              Your preferences will be saved automatically
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
