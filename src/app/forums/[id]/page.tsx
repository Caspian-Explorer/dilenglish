'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { forumTopics } from '@/lib/data';
import { type ForumPost, type ForumReply } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ForumPostPage({ params }: { params: { id: string } }) {
  const topic = forumTopics.find(t => t.id === params.id);
  const [newReply, setNewReply] = useState('');

  if (!topic) {
    notFound();
  }

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;
    // In a real app, you would submit this to a server.
    // For this mock, we'll just log it.
    console.log({
      topicId: topic.id,
      replyContent: newReply,
    });
    alert('Reply submitted! (Check console for data). This is a demo and will not persist.');
    setNewReply('');
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 container pt-24">
      <div>
        <Button variant="ghost" asChild>
          <Link href="/forums" className='mb-4'>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Forums
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline tracking-tight">{topic.title}</h1>
      </div>

      {/* Original Post */}
      <Card>
        <CardHeader className="flex flex-row items-start gap-4 space-y-0">
          <Avatar>
            <AvatarImage src={topic.post.author.avatar} alt={topic.post.author.name} />
            <AvatarFallback>{topic.post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='w-full'>
            <CardTitle className="text-lg">{topic.post.author.name}</CardTitle>
            <CardDescription>{topic.post.date}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/90 whitespace-pre-wrap">{topic.post.content}</p>
        </CardContent>
      </Card>
      
      <Separator />

      {/* Replies */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-headline">Replies ({topic.post.replies.length})</h2>
        {topic.post.replies.map((reply) => (
          <Card key={reply.id} className="bg-secondary/50">
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
              <Avatar className="h-9 w-9">
                <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='w-full'>
                <CardTitle className="text-base">{reply.author.name}</CardTitle>
                <CardDescription>{reply.date}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 whitespace-pre-wrap">{reply.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reply Form */}
      <Card>
        <CardHeader>
          <CardTitle>Your Reply</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReplySubmit} className="space-y-4">
            <Textarea
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Write your reply here..."
              rows={5}
            />
            <Button type="submit">Post Reply</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
