"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronDown, Eye, EyeOff, X } from "lucide-react";
import DatePickerComponent from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { DateValue } from "react-aria-components";
import YearSelect from "@/components/ui/select-with-search";
import { signIn, SignInResponse } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import { uploadToCloudinary } from "@/utilities/upload-to-cloudinary";

// Zod Schema for validation
const registrationSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  username: z.string().min(1, "User Name is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  bio: z.string().max(200, "Bio must be under 200 characters").optional(),
  gender: z.string().min(1, "Gender is required"),
  program: z.string(),
});

interface University {
  _id: string;
  name: string;
}

export function RegistrationForm() {
  function getCookie(name: string) {
    if (typeof document === "undefined") return null;

    const cookieArray = document.cookie.split("; ");
    for (let i = 0; i < cookieArray.length; i++) {
      const [key, value] = cookieArray[i].split("=");
      if (key === name) {
        return value;
      }
    }
    return null;
  }

  const router = useRouter();
  useEffect(() => {
    const email = getCookie("email");
    if (!email) router.push("/auth/register/register-email");
  }, [router]);

  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get("/api/universities");
        setUniversities(response.data);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };
    fetchUniversities();
  }, []);

  useEffect(() => {
    const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds

    const timer = setTimeout(() => {
      router.push("/auth/register/register-email");
    }, tenMinutes);

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [router]);

  // UseState for each field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [program, setProgram] = useState("");
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [value, setValue] = useState<string>("");

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setFile(file);
    }
  };

  const email = getCookie("email");

  const handleSubmit = async () => {
    setIsLoading(true);
    const validationResult = registrationSchema.safeParse({
      firstName,
      lastName,
      username,
      password,
      bio,
      gender,
      program,
    });

    if (!validationResult.success) {
      toast.error("Please fill in all required fields correctly.");
      setIsLoading(false);
      return;
    }

    if (!file) {
      toast.error("Please upload a profile picture.");
      setIsLoading(false);
      return;
    }

    const { url } = await uploadToCloudinary(file);

    const submissionData = {
      firstName,
      lastName,
      username,
      password: password,
      profilePicture: url,
      bio,
      dateOfBirth: selectedDate ? selectedDate.toString() : "",
      gender,
      universityID: value,
      email: email,
      academicYear: selectedYear,
      program,
    };

    axios
      .post("/api/auth/register/final-details", submissionData)
      .then(async () => {
        toast.success("Registered! Logging in...");
        const callback: SignInResponse | undefined = await signIn("credentials", { email, password, redirect: false });
        if (callback?.error) toast.error("Couldn't authenticate!");
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in successfully!");
          router.push("/home");
        }
      })
      .catch(() => toast.error("Error registering!"))
      .finally(() => setIsLoading(false));

    setIsLoading(false);
  };

  return (
    <Card className="mx-auto max-w-lg z-20 mb-20">
      <CardHeader>
        <CardTitle className="text-2xl">Register details</CardTitle>
        <CardDescription>Complete the form to create an account.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={isLoading} />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                className="pe-9"
                placeholder="Password"
                disabled={isLoading}
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg"
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? "Hide password" : "Show password"}
              >
                {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div
              className={`mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border`}
              role="progressbar"
              aria-valuenow={strengthScore}
              aria-valuemin={0}
              aria-valuemax={4}
            >
              <div
                className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                style={{ width: `${(strengthScore / 4) * 100}%` }}
              ></div>
            </div>

            {/* Password strength description */}
            <p id="password-strength" className="mb-2 text-sm font-medium text-foreground">
              {getStrengthText(strengthScore)}. Must contain:
            </p>

            {/* Password requirements list */}
            <ul className="space-y-1.5" aria-label="Password requirements">
              {strength.map((req, index) => (
                <li key={index} className="flex items-center gap-2">
                  {req.met ? (
                    <Check size={16} className="text-emerald-500" aria-hidden="true" />
                  ) : (
                    <X size={16} className="text-muted-foreground/80" aria-hidden="true" />
                  )}
                  <span className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}>
                    {req.text}
                    <span className="sr-only">{req.met ? " - Requirement met" : " - Requirement not met"}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Profile Picture Upload */}
          <div>
            <Label htmlFor="profilePicture">Profile Picture</Label>
            <div className="relative flex items-center gap-3 mt-2">
              <Image
                alt="Profile Image"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full"
                src={preview || "/placeholder.png"}
              />
              <input
                onChange={handleFileChange}
                type="file"
                id="profilePicture"
                className="absolute inset-0 opacity-0 cursor-pointer w-12"
                accept="image/*"
              />
              <span className="text-sm">Click to change your profile picture.</span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>

          {/* Date of Birth and Academic Year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <DatePickerComponent value={selectedDate} onChange={setSelectedDate} />
            </div>
            <div>
              <Label htmlFor="academicYear">Academic Year</Label>
              <YearSelect value={selectedYear} onChange={setSelectedYear} />
            </div>
          </div>

          {/* Gender */}
          <div>
            <Label htmlFor="select-gender">Select Gender</Label>
            <Select defaultValue="prefer-not-to-disclose" onValueChange={setGender} disabled={isLoading}>
              <SelectTrigger id="select-gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="man">Man</SelectItem>
                <SelectItem value="woman">Woman</SelectItem>
                <SelectItem value="prefer-not-to-disclose">Prefer not to disclose</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* University */}
          <div>
            <Label htmlFor="select-university">Select University</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span className={cn("truncate", !value && "text-muted-foreground")}>
                    {value ? universities.find((uni) => uni._id === value)?.name : "Select university"}
                  </span>
                  <ChevronDown size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandInput placeholder="Search university..." />
                  <CommandList>
                    <CommandEmpty>No university found.</CommandEmpty>
                    <CommandGroup>
                      {universities.map((university) => (
                        <CommandItem
                          key={university._id}
                          value={university._id}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue);
                          }}
                        >
                          {university.name}
                          {value === university._id && <Check size={12} />}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="mt-3">
          <Label htmlFor="program">Program</Label>
          <Input id="program" value={program} onChange={(e) => setProgram(e.target.value)} disabled={isLoading} />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <Button onClick={handleSubmit} disabled={isLoading}>
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
