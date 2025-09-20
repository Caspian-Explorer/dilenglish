'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Please fill out both title and content.');
      return;
    }
    // In a real app, you would submit this to a server.
    // For this mock, we'll just log it and redirect.
    console.log({
      title,
      content,
    });
    alert('New topic created! (Check console for data). This is a demo and will not persist.');
    router.push('/forums');
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 container pt-24">
      <div className='max-w-3xl mx-auto'>
         <Button variant="ghost" asChild>
          <Link href="/forums" className='mb-4'>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Forums
          </Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-headline">Create a New Post</CardTitle>
            <CardDescription>Share your thoughts and questions with the community.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a descriptive title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content here..."
                  rows={10}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Create Post</Button>
                <Button type="button" variant="outline" onClick={() => router.push('/forums')}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
