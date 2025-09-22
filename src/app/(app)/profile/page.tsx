'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { userProgress, userLanguageLevels } from "@/lib/data";
import { Flame, Star, BookCheck } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
    router.refresh(); // Force a refresh to clear user state
  };

  if (!user) {
    return null;
  }

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">
          My Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 space-y-8">
            <Card>
                <CardHeader className="items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={user.picture ?? undefined} alt={user.name ?? ''} />
                        <AvatarFallback>{user.name?.charAt(0) ?? user.email?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-headline text-2xl">{user.name ?? 'User'}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-around">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{userProgress.points.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Star className="h-3 w-3"/> Points</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold">{userProgress.dailyStreak}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Flame className="h-3 w-3" /> Streak</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><BookCheck /> Language Levels</CardTitle>
                    <CardDescription>Your assessed proficiency levels from placement tests.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {userLanguageLevels.length > 0 ? userLanguageLevels.map(level => (
                        <div key={level.language} className="flex justify-between items-center">
                            <span className="font-semibold">{level.language}</span>
                            <span className="text-primary font-bold text-lg">{level.level}</span>
                        </div>
                    )) : (
                        <p className="text-sm text-muted-foreground">No placement tests taken yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Account Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user.name ?? ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email ?? ''} />
              </div>
              <div className="flex gap-2">
                <Button>Save Changes</Button>
                <Button variant="destructive" onClick={handleLogout}>Logout</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Preferences</CardTitle>
              <CardDescription>Customize your learning experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="language">Learning Language</Label>
                <Select defaultValue="spanish">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                 <Select defaultValue="light">
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select a theme" />
                  </Trigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
