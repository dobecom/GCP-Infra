'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface Comment {
  title: string;
  name: string;
  comment: string;
}

export function DemoPage() {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  const [comments, setComments] = useState([] as Comment[]);

  const [newComment, setNewComment] = useState({
    title: '',
    name: '',
    comment: '',
  });

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setNewComment((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (newComment.title && newComment.name && newComment.comment) {
      setComments((prev) => [newComment, ...prev]);
      setNewComment({ title: '', name: '', comment: '' });
    }
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newComment),
    });
    console.log(await result.json());
  };

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    console.log(url);
    fetch(url, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  }, []);

  return (
    <div className="flex h-screen flex-col">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <h1 className="text-2xl font-bold">Comment Board Demo</h1>
      </header>
      <main className="flex-1 overflow-y-auto px-4 py-8">
        <div className="w-full max-w-2xl space-y-4 mx-auto">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 bg-white p-4 rounded shadow"
            >
              <div className="font-medium">{comment.title}</div>
              <div className="text-muted-foreground">{comment.name}</div>
              <div>{comment.comment}</div>
            </div>
          ))}
        </div>
      </main>
      <div className="bg-muted px-4 py-6">
        <form
          className="w-full max-w-2xl mx-auto space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter a title"
                value={newComment.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={newComment.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                placeholder="Enter your comment"
                rows={2}
                value={newComment.comment}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
