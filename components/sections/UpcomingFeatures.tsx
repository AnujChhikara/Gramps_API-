"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export function UpcomingFeatures() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section className='py-20 px-4'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          Explore Upcoming Features
        </h2>
        <div className='grid md:grid-cols-3 gap-8 mb-12'>
          <Card className='bg-transparent border-dashed border-2 shadow-xl border-zinc-900'>
            <CardHeader>
              <CardTitle className='text-black text-lg'>
                Request Storage
              </CardTitle>
            </CardHeader>
            <CardContent className='text-zinc-700 font-semibold'>
              Effortlessly store and manage all your API requests for quick
              access and reuse.
            </CardContent>
          </Card>
          <Card className='bg-transparent border-dashed border-2 shadow-xl border-zinc-900'>
            <CardHeader>
              <CardTitle className='text-black text-lg'>Collections</CardTitle>
            </CardHeader>
            <CardContent className='text-zinc-700 font-semibold'>
              Organize your API requests into collections for better
              organization and streamlined management.
            </CardContent>
          </Card>
          <Card className='bg-transparent border-dashed border-2 shadow-xl border-zinc-900'>
            <CardHeader>
              <CardTitle className='text-black text-lg'>
                Request History
              </CardTitle>
            </CardHeader>
            <CardContent className='text-zinc-700 font-semibold'>
              Easily view and replay your recent API requests to quickly
              troubleshoot and test again.
            </CardContent>
          </Card>
        </div>
        <div className='text-center'>
          <h3 className='text-2xl font-semibold mb-4'>Join the Waitlist</h3>
          <p className='mb-6'>
            Be the first to get notified when these exciting new features are
            released!
          </p>
          {isSubmitted ? (
            <div className='flex items-center justify-center text-black font-bold'>
              <Check className='mr-2' />
              <span>Thank you for signing up for the waitlist!</span>
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
