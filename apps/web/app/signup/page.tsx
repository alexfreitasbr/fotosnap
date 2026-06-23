import SignUpForm from "@/components/ui/signup-form";

import { GoTo } from "@/components/ui/goto";

export default function SingUp() {
  return (
    <main className="min-h-screen flex flex-col  gap-8 items-center justify-center py-12 px-4 bg-background sm:px-6 lg:px-8">
      <section className="flex flex-col items-center justify-center gap-2">
        <header>
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">
            Create an account
          </h2>
        </header>
        <aside className="flex flex-col items-center justify-center gap-2 ">
          <dl className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <dt>Aready have an account?</dt>
            <GoTo href="/login">
              <dd>Login</dd>
            </GoTo>
          </dl>
        </aside>
      </section>
      <SignUpForm />
    </main>
  );
}
