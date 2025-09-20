import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const pressMentions = [
    {
        publication: "TechForward",
        title: "Dilenglish is Revolutionizing Language Education with AI",
        date: "October 2024",
        imageUrl: "https://picsum.photos/seed/tech/400/200",
        link: "#",
    },
    {
        publication: "Global Learner Weekly",
        title: "The Most Engaging Language App of the Year?",
        date: "September 2024",
        imageUrl: "https://picsum.photos/seed/learner/400/200",
        link: "#",
    },
    {
        publication: "StartupDaily",
        title: "How Dilenglish Secured $10M in Seed Funding to Gamify Learning",
        date: "August 2024",
        imageUrl: "https://picsum.photos/seed/startup/400/200",
        link: "#",
    }
];

export default function PressPage() {
    return (
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline tracking-tight">Press & Media</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              See what people are saying about Dilenglish.
            </p>
          </div>
  
          <div className="grid gap-8 md:grid-cols-1">
            {pressMentions.map((mention) => (
              <Card key={mention.title} className="overflow-hidden">
                <Link href={mention.link} className="block hover:bg-secondary/50">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <Image 
                                src={mention.imageUrl} 
                                alt={mention.title} 
                                width={300} 
                                height={200}
                                className="h-48 w-full object-cover md:h-full md:w-48"
                            />
                        </div>
                        <div className="p-6 flex flex-col justify-center">
                            <div className="uppercase tracking-wide text-sm text-primary font-semibold">{mention.publication}</div>
                            <h3 className="mt-1 text-lg leading-tight font-medium text-foreground">{mention.title}</h3>
                            <p className="mt-2 text-muted-foreground">{mention.date}</p>
                        </div>
                    </div>
                </Link>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center p-8 border rounded-lg">
            <h3 className="text-2xl font-bold font-headline">Media Inquiries</h3>
            <p className="mt-2 text-muted-foreground">For press inquiries, please contact us at:</p>
            <Button variant="link" asChild><Link href="mailto:press@dilenglish.com">press@dilenglish.com</Link></Button>
          </div>
        </div>
      </main>
    );
  }
  