"use client";

import { Button } from "@/components/ui/button";
import { GoTo } from "@/components/ui/goto";
import { useAuthSession } from "@/hooks/use-auth-session";
import { clearAuthSession } from "@/lib/auth-api";
import { useLanguageStore } from "@/stores/language";
import { useRouter } from "next/navigation";

export function LoginLogout() {
  const { language } = useLanguageStore();
  const user = useAuthSession();
  const router = useRouter();

  function handleLogout() {
    clearAuthSession();
    router.push("/");
  }

  if (user) {
    return (
    <Button type="button" variant="link" onClick={handleLogout} className="whitespace-nowrap h-auto p-0 text-lg font-semibold hover:no-underline transition-colors duration-300 hover:text-primary/70 ">
        {language.navigation.logout}
    </Button>
    );
  }

  return <GoTo href="/login" className="whitespace-nowrap text-lg font-semibold">{language.navigation.login}</GoTo>;
}
