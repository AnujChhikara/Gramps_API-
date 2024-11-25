"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export function UpcomingFeatures() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log("Email submitted:", email);
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section className='py-20 px-4 bg-black text-white'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          Upcoming Features
        </h2>
        <div className='grid md:grid-cols-3 gap-8 mb-12'>
          <Card className='bg-zinc-900 border-zinc-800'>
            <CardHeader>
              <CardTitle>Request Storage</CardTitle>
            </CardHeader>
            <CardContent>
              Store all your API requests for easy access and reuse.
            </CardContent>
          </Card>
          <Card className='bg-zinc-900 border-zinc-800'>
            <CardHeader>
              <CardTitle>Collections</CardTitle>
            </CardHeader>
            <CardContent>
              Organize your requests into collections for better management.
            </CardContent>
          </Card>
          <Card className='bg-zinc-900 border-zinc-800'>
            <CardHeader>
              <CardTitle>Request History</CardTitle>
            </CardHeader>
            <CardContent>
              View and replay your recent API requests with ease.
            </CardContent>
          </Card>
        </div>
        <div className='text-center'>
          <h3 className='text-2xl font-semibold mb-4'>Join the Waitlist</h3>
          <p className='mb-6'>
            Be the first to know when new features are released!
          </p>
          {isSubmitted ? (
            <div className='flex items-center justify-center text-green-500'>
              <Check className='mr-2' />
              <span>Thank you for joining the waitlist!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='flex max-w-md mx-auto'>
              <Input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='mr-2'
              />
              <Button type='submit'>Join Waitlist</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
