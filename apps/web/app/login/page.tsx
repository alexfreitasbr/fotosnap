import SignInForm from "@/components/auth/signin-form";
import { GoTo } from "@/components/ui/goto";
import Link from "next/link";

export default function SingUp() {
  return (
    <main className="min-h-screen flex flex-col  gap-8 items-center justify-center py-12 px-4 bg-background sm:px-6 lg:px-8">
      <section className="flex flex-col items-center justify-center gap-2">
        <header>
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">
            Login to your account
          </h2>
        </header>
        <aside className="flex flex-col items-center justify-center gap-2 ">
          <dl className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <dt>`Don"t have have an account?`</dt>
            <GoTo href="/signup">
              <dd>Signup</dd>
            </GoTo>
          </dl>
        </aside>
      </section>
      <SignInForm />
    </main>
  );
}
