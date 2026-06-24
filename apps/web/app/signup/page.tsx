"use client";
import SignUpForm from "@/components/auth/signup-form";

import { GoTo } from "@/components/ui/goto";
import { SignUpValues } from "@/lib/schema";
import { useLanguageStore } from "@/stores/language";
export default function SingUp() {

  const { language } = useLanguageStore();

  function onSubmit(values: SignUpValues) {
    console.log(values);
  }
  return (
    <main className="min-h-screen flex flex-col  gap-8 items-center justify-center py-12 px-4 bg-background sm:px-6 lg:px-8">
      <section className="flex flex-col items-center justify-center gap-2">
        <header>
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">
            {language.signup.header}
          </h2>
        </header>
        <aside className="flex flex-col items-center justify-center gap-2 ">
          <dl className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <dt>{language.signup.areadyHave}</dt>
            <GoTo href="/login">
              <dd>{language.login.loginButton}</dd>
            </GoTo>
          </dl>
        </aside>
      </section>
      <SignUpForm onSubmit={onSubmit} />
    </main>
  );
}
