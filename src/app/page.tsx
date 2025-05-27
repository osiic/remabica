import Link from "next/link";
import { auth } from "@/lib/auth";

import { SignOut } from "@/components/molecules/SignOut";
import { ModeToggle } from "@/components/molecules/ModeToggle";

export default async function Home() {
  const session = await auth(); // Server-side check

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <nav className="flex gap-4 p-4 bg-gray-100 text-black">
        {/* Normal routes */}
        <Link href="/series">Series</Link>
        <Link href="/article">Article</Link>

        {session ? (
          <>
            {/* Sudah login */}
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/admin">Admin</Link>
            <SignOut />
          </>
        ) : (
          <>
            {/* Belum login */}
            <Link href="/sign-in">Sign In</Link>
          </>
        )}
      </nav>

      <h1>Hallo</h1>
      <ModeToggle />
    </div>
  );
}
