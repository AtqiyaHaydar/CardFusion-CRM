"use client"

import { LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';

export default function Home() {
  return (
    <main className="h-screen w-full overflow-hidden flex items-center justify-center">
      <Card className="bg-white/15 border-none shadow-none p-4">
        <CardHeader>
          <CardTitle className='text-center text-white'>
            Welcome To CardFusion CRM!
          </CardTitle>
          <CardDescription className='text-center text-white/90 text-[18px]'>
            A Customer Relationship Management Application.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex items-center justify-center w-full'>
          <Link href="/dashboard" className='w-full'>
            <Button className='bg-white rounded-full text-black flex justify-center items-center gap-4 w-full hover:gap-8 hover:bg-white transition-all'>
              Go To Dashboard! <LogIn />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
