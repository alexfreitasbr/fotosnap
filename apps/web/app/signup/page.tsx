"use client";
import SignUpForm from "@/components/auth/signup-form";

import { GoTo } from "@/components/ui/goto";
import { saveAuthSession, signUp } from "@/lib/auth-api";
import { SignUpValues } from "@/lib/schema";
import { useLanguageStore } from "@/stores/language.store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SingUp() {
  const { language } = useLanguageStore();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();

  async function onSubmit(values: SignUpValues) {
    setErrorMessage(undefined);

    try {
      const auth = await signUp(values);
      saveAuthSession(auth);
      router.push("/");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to create account",
      );
      throw error;
    }
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
              <dd>{language.signup.areadyHave}</dd>
            </GoTo>
          </dl>
        </aside>
      </section>
      <SignUpForm onSubmit={onSubmit} errorMessage={errorMessage} />
    </main>
  );
}
