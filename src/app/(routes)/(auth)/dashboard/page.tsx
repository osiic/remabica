import { ModeToggle } from "@/components/molecules/ModeToggle";
import { SignOut } from "@/components/molecules/SignOut";
import { PostForm } from "@/components/organisms/PostForm";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Hallo</h1>
      <ModeToggle />
      <SignOut />
      <PostForm />
    </div>
  );
}
