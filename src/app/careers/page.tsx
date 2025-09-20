import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const jobOpenings = [
    {
        title: "Senior Frontend Engineer",
        location: "Remote",
        department: "Engineering",
    },
    {
        title: "AI/ML Curriculum Designer (Spanish)",
        location: "Remote",
        department: "Content",
    },
    {
        title: "Product Manager",
        location: "New York, NY",
        department: "Product",
    },
    {
        title: "Community Manager (German)",
        location: "Berlin, Germany",
        department: "Marketing",
    },
];

export default function CareersPage() {
    return (
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline tracking-tight">Join Our Team</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Help us build the future of language learning.
            </p>
          </div>
  
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-headline tracking-tight">Current Openings</h2>
            {jobOpenings.map((job) => (
                <Card key={job.title}>
                    <CardHeader>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription>{job.department} &middot; {job.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline">
                            View Details <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    </CardContent>
                </Card>
            ))}
          </div>

          <div className="mt-12 text-center p-8 bg-secondary/50 rounded-lg">
            <h3 className="text-2xl font-bold font-headline">Don't see a role for you?</h3>
            <p className="mt-2 text-muted-foreground">We're always looking for talented people. Send us your resume and let us know how you can make an impact.</p>
            <Button className="mt-4">Contact Us</Button>
          </div>
        </div>
      </main>
    );
  }
  