
import { Languages } from "lucide-react";
import AuthForm from "./login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-secondary/30">
       <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
       <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-transparent to-background"></div>
      <div className="w-full max-w-md space-y-6 z-10 bg-card p-8 rounded-xl shadow-2xl">
        <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
                <Link href="/" className="flex items-center gap-2">
                    <Languages className="size-10 text-primary" />
                    <h1 className="text-4xl font-bold font-headline">Dilenglish</h1>
                </Link>
            </div>
          <p className="text-muted-foreground">
            Sign in to continue your language journey
          </p>
        </div>
        <AuthForm />
      </div>
    </main>
  );
}
