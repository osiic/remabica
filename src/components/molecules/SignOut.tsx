import { signOut } from "@/lib/auth";
import { Button } from "@/components/atoms/Button";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button>Sign Out</Button>
    </form>
  );
}
