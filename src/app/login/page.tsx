import Image from 'next/image';
import LoginForm from './login-form';
import {Languages} from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1740&auto=format&fit=crop"
          alt="People learning a language"
          layout="fill"
          objectFit="cover"
          className="opacity-90"
        />
        <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
            <div className="flex items-center gap-2 text-2xl font-bold">
                <Languages className="h-8 w-8" />
                <span>Dilenglish</span>
            </div>
            <div className="bg-black/50 p-6 rounded-lg backdrop-blur-sm">
                <blockquote className="text-xl italic">
                    "To have another language is to possess a second soul."
                </blockquote>
                <cite className="mt-2 block font-semibold not-italic">- Charlemagne</cite>
            </div>
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-balance text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
