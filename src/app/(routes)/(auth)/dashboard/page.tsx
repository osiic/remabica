import { ModeToggle } from "@/components/molecules/ModeToggle";
import { SignIn } from "@/components/molecules/SignIn";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Hallo</h1>
      <ModeToggle />
      <SignIn />
    </div>
  );
}
