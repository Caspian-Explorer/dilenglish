import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Languages, CheckCircle, Users, Star, Target, Zap, Award } from 'lucide-react';
import RootLayout from './layout';

const reasons = [
  {
    title: 'Personalized Learning Paths',
    description: 'AI-driven paths that adapt to your learning style and pace, ensuring you learn what you need faster.',
    icon: <Target className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Grammar & practice checking',
    description: 'Instant feedback on your grammar and pronunciation with our advanced AI-powered tools.',
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Learn Anytime, Anywhere',
    description: 'Access your lessons on any device, and even download them for offline learning on the go.',
    icon: <Zap className="w-8 h-8 text-primary" />,
  },
];

const features = [
  {
    title: 'Expert-Crafted Content',
    description:
      'Our curriculum is designed by language experts to ensure you get the most effective and up-to-date learning materials.',
    icon: <Award className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Offline Mode for On-the-Go Learning',
    description:
      'Download lessons and practice offline. Your progress will sync automatically when you reconnect.',
    icon: <Zap className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Progress Tracking & Achievements',
    description:
      'Stay motivated by tracking your progress, earning badges, and competing with friends on the leaderboard.',
    icon: <Star className="w-8 h-8 text-primary" />,
  },
];

const testimonials = [
  {
    name: 'Sarah L.',
    role: 'World Traveler',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    text: 'Dilenglish made learning Spanish so intuitive! The personalized paths helped me focus on what I needed for my trip. I felt confident speaking from day one.',
  },
  {
    name: 'Mike P.',
    role: 'Student',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    text: "The gamified experience is addictive. I find myself competing for high scores and actually enjoying grammar practice. It's unlike any other language app I've used.",
  },
  {
    name: 'Jessica T.',
    role: 'Business Professional',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    text: 'The AI feedback on pronunciation is a game-changer. I could hear the improvement in my accent within weeks. Highly recommend for serious learners.',
  },
    {
    name: 'David R.',
    role: 'Hobbyist',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    text: 'I love how the cultural insights are woven into the lessons. It\'s not just about words; it\'s about understanding the culture. Makes learning much more meaningful.',
  },
  {
    name: 'Emily C.',
    role: 'Expat',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
    text: 'Being able to download lessons is perfect for my commute. I can learn anywhere, anytime. The app is beautifully designed and super easy to navigate.',
  },
  {
    name: 'Alex G.',
    role: 'Language Enthusiast',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d',
    text: "Joining the community has been fantastic. It's great to connect with other learners, practice together, and get tips. It feels like we're all in it together.",
  },
];


const SiteHeader = () => (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Languages className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline">Dilenglish</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link href="/#features" className="hover:text-primary">Features</Link>
            <Link href="/languages" className="hover:text-primary">Languages</Link>
            <Link href="/forums" className="hover:text-primary">Forums</Link>
            <Link href="/#testimonials" className="hover:text-primary">Testimonials</Link>
            <Link href="/#community" className="hover:text-primary">Community</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
)

const SiteFooter = () => (
    <footer className="bg-gray-800 text-gray-300">
          <div className="container mx-auto px-4 md:px-6 py-12">
             <div className="grid md:grid-cols-4 gap-8">
                <div>
                   <h3 className="font-bold text-lg text-white">Dilenglish</h3>
                   <p className="mt-2 text-sm">The best way to learn a language.</p>
                </div>
                 <div>
                   <h3 className="font-bold text-lg text-white">LEARN</h3>
                   <ul className="mt-4 space-y-2 text-sm">
                      <li><Link href="/languages" className="hover:text-white">Languages</Link></li>
                       <li><Link href="/forums" className="hover:text-white">Forums</Link></li>
                       <li><Link href="/#features" className="hover:text-white">Features</Link></li>
                   </ul>
                </div>
                 <div>
                   <h3 className="font-bold text-lg text-white">COMPANY</h3>
                   <ul className="mt-4 space-y-2 text-sm">
                      <li><Link href="/about" className="hover:text-white">About</Link></li>
                       <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                       <li><Link href="/press" className="hover:text-white">Press</Link></li>
                   </ul>
                </div>
                 <div>
                   <h3 className="font-bold text-lg text-white">SOCIAL</h3>
                   <ul className="mt-4 space-y-2 text-sm">
                      <li><Link href="#" className="hover:text-white">Twitter</Link></li>
                       <li><Link href="#" className="hover:text-white">Instagram</Link></li>
                       <li><Link href="#" className="hover:text-white">Facebook</Link></li>
                   </ul>
                </div>
             </div>
             <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Dilenglish, Inc. All Rights Reserved.</p>
             </div>
          </div>
      </footer>
)


export default function LandingPage({children}: {children?: React.ReactNode}) {
  return (
    <div className="bg-background text-foreground">
      <SiteHeader />

      <main className="pt-16">
        {children || <LandingPageContent />}
      </main>

      <SiteFooter />
    </div>
  );
}


const LandingPageContent = () => (
    <>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-secondary/30">
           <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-transparent to-background"></div>
          <div className="container mx-auto px-4 md:px-6 text-center relative">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
              Practice language easier <br /> with <span className="text-primary">Dilenglish</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Personalized AI-driven lessons, gamified experience, and a global community. The future of language learning is here.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">Start for Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                 <Link href="/#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Reasons Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Here are the reasons you should try
              </h2>
              <p className="mt-2 text-muted-foreground">
                Everything you need to become fluent, in one app.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {reasons.map((reason) => (
                <Card key={reason.title} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="items-center">
                    <div className="bg-primary/10 p-3 rounded-full">{reason.icon}</div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-xl font-bold font-headline">{reason.title}</h3>
                    <p className="mt-2 text-muted-foreground">{reason.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


        {/* Why Stands Out Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-primary">OUR FEATURES</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold font-headline">
                Why Dilenglish Stands Out from the Rest
              </h2>
              <p className="mt-4 text-muted-foreground">
                Dilenglish is not just another language app. We combine cutting-edge AI with proven teaching methodologies to create a learning experience that is both effective and engaging.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Real-time, AI-powered feedback</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Gamified lessons to keep you motivated</span>
                </li>
                 <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Content created by language experts</span>
                </li>
                 <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Vibrant community of learners</span>
                </li>
              </ul>
            </div>
            <div>
              <Image
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=600&h=700&fit=crop"
                alt="Team working"
                width={600}
                height={700}
                className="rounded-lg shadow-2xl"
                data-ai-hint="woman smiling"
              />
            </div>
          </div>
        </section>

         {/* Gamified Learning Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
             <div className="bg-primary/5 p-8 md:p-12 rounded-2xl grid md:grid-cols-2 gap-12 items-center overflow-hidden">
                <div className="relative z-10">
                  <span className="text-sm font-semibold text-primary">USE CASE</span>
                  <h2 className="mt-2 text-3xl mdTono-4xl font-bold font-headline">
                    Gamified Learning Experience
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                   Turn learning into a game. Earn points, unlock new levels, and collect badges as you master new skills. Compete with friends and stay motivated on your language journey.
                  </p>
                  <Button className="mt-6" variant="outline" asChild>
                    <Link href="/dashboard">Start Learning</Link>
                  </Button>
                </div>
                 <div className="relative h-64 md:h-full">
                  <Image src="https://picsum.photos/seed/app-ux/600/400" alt="App interface" layout="fill" objectFit="cover" className="rounded-lg shadow-lg" data-ai-hint="app interface" />
                </div>
             </div>
              <div className="mt-8 grid gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="text-left bg-card p-2 shadow-lg hover:shadow-xl transition-shadow">
                   <CardHeader>
                    <div className="bg-primary/10 p-3 rounded-full w-min">{feature.icon}</div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-bold font-headline">{feature.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <span className="text-sm font-semibold text-primary">TESTIMONIALS</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold font-headline">
                Hear It From Our Happy Learners
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="p-6 bg-card shadow-lg">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-muted-foreground italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Join Community Section */}
        <section id="community" className="py-20 md:py-32 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6 text-center">
             <Users className="h-12 w-12 mx-auto text-primary-foreground/80"/>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold font-headline">
              Join a Global Community
            </h2>
            <p className="mt-4 max-w-2xl mx-auto">
              Connect with millions of learners worldwide, practice together, and make new friends who share your passion for language.
            </p>
            <div className="mt-8 flex justify-center gap-4">
               <Button size="lg" variant="secondary" asChild>
                <Link href="/dashboard">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </section>
    </>
)
