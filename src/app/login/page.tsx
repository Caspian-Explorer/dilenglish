import { Languages } from "lucide-react";
import LoginForm from "./login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <div className="flex justify-center items-center gap-2 mb-4">
                <Languages className="size-10 text-primary" />
                <h1 className="text-4xl font-bold font-headline">Dilenglish</h1>
            </div>
          </Link>
          <p className="text-muted-foreground">
            Sign in to continue your language journey
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
