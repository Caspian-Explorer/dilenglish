import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, MessageCircle } from "lucide-react";
import CulturalInsightCard from "@/components/cultural-insight-card";
import { userProgress } from "@/lib/data";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">
          Welcome back!
        </h1>
        <p className="text-muted-foreground">
          Ready for your next lesson? Let's leap into language.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="font-headline">My Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Points</span>
              <span className="font-bold text-primary">{userProgress.points.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Level</span>
              <span className="font-bold">{userProgress.level}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Daily Streak</span>
              <span className="font-bold">{userProgress.dailyStreak} days 🔥</span>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/progress">
                View Detailed Progress <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="font-headline">Quick Start</CardTitle>
            <CardDescription>Jump right back into learning.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" size="lg" asChild>
              <Link href="/dialogues">
                <MessageCircle className="mr-4" />
                Practice a Dialogue
              </Link>
            </Button>
            <Button variant="secondary" className="w-full justify-start" size="lg" asChild>
              <Link href="/vocabulary">
                <BookOpen className="mr-4" />
                Review Vocabulary
              </Link>
            </Button>
          </CardContent>
        </Card>

        <CulturalInsightCard />

      </div>
    </main>
  );
}
