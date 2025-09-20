
import Link from 'next/link';
import { forumTopics } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MessageSquare, PlusCircle } from 'lucide-react';

export default function ForumsPage() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight flex items-center gap-2">
            <MessageSquare className="h-8 w-8" />
            Forums
          </h1>
          <p className="text-muted-foreground">
            Discuss with the community and get help.
          </p>
        </div>
        <Button asChild>
          <Link href="/forums/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Topics</CardTitle>
          <CardDescription>Browse the list of topics below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Topic</TableHead>
                <TableHead className="hidden md:table-cell text-center">Replies</TableHead>
                <TableHead className="text-right">Last Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forumTopics.map((topic) => (
                <TableRow key={topic.id}>
                  <TableCell>
                    <Link href={`/forums/${topic.id}`} className="font-medium hover:underline">
                      {topic.title}
                    </Link>
                    <div className="text-sm text-muted-foreground">by {topic.authorName}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-center">{topic.replyCount}</TableCell>
                  <TableCell className="text-right">{topic.lastActivity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
