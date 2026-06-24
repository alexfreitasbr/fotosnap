"use client";

import { GoTo } from "@/components/ui/goto";
import SignInForm from "@/components/auth/signin-form";
import { saveAuthSession, signIn } from "@/lib/auth-api";
import { SignInValues } from "@/lib/schema";
import { useLanguageStore } from "@/stores/language";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SingUp() {
  const { language } = useLanguageStore();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();

  async function onSubmit(values: SignInValues) {
    setErrorMessage(undefined);

    try {
      const auth = await signIn(values);
      saveAuthSession(auth);
      router.push("/");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to sign in",
      );
      throw error;
    }
  }

  return (
    <main className="min-h-screen flex flex-col  gap-8 items-center justify-center py-12 px-4 bg-background sm:px-6 lg:px-8">
      <section className="flex flex-col items-center justify-center gap-2">
        <header>
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">
            {language.login.header}
          </h2>
        </header>
        <aside className="flex flex-col items-center justify-center gap-2 ">
          <dl className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <dt>{language.login.doNothave}</dt>
            <GoTo href="/signup">
              <dd>{language.signup.signupButton}</dd>
            </GoTo>
          </dl>
        </aside>
      </section>
      <SignInForm onSubmit={onSubmit} errorMessage={errorMessage} />
    </main>
  );
}
