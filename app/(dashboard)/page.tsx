import Image from "next/image";
import {Button} from "@/components/ui/button";
import {UserButton} from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl">This is an authenticated route!</h1>
        <UserButton />
      <Button variant="default">Click Me!</Button>
    </main>
  );
}
