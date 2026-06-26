"use client";

import { Button } from "@/components/ui/button";
import { GoTo } from "@/components/ui/goto";
import { useAuthSession } from "@/hooks/use-auth-session";
import { clearAuthSession } from "@/lib/auth-api";
import { useLanguageStore } from "@/stores/language.store";
import { UserIcon } from "lucide-react";
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
      <>
        <GoTo
          className={`flex items-center justify-center text-white rounded-full p-1 bg-black cursor-pointer`}
          href={"/profile"}
          aria-label={language.navigation.profile}
          test-id={"profile"}
        >
          <UserIcon className="size-4" />
        </GoTo>
        <Button
          aria-label={language.navigation.logout}
          type="button"
          variant="link"
          onClick={handleLogout}
          test-id={"logout"}
          className="whitespace-nowrap h-auto p-0 text-lg font-semibold hover:no-underline transition-colors duration-300 hover:text-primary/70 cursor-pointer"
        >
          {language.navigation.logout}
        </Button>
      </>
    );
  }

  return (
    <GoTo href="/login" aria-label={language.navigation.login} test-id={"login"} className="whitespace-nowrap text-lg font-semibold">
      {language.navigation.login}
    </GoTo>
  );
}
