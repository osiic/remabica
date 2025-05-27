import { signIn } from "@/lib/auth";
import { Button } from "@/components/atoms/Button";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <Button>Signin with Google</Button>
    </form>
  );
}
