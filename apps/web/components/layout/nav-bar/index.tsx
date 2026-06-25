"use client";

import { LoginLogout } from "@/components/layout/login-logout";
import { GoTo } from "@/components/ui/goto";
import { NAVIGATION_ITEMS } from "@/core/navigation/navigation";
import { useLanguageStore } from "@/stores/language";

export function NavBar() {
  const { language } = useLanguageStore();


  return (
    <nav className="flex w-full pr-14 gap-4" aria-label="Menu Principal" test-id="navbar">
      <ul className="flex w-full items-center gap-4">
        {NAVIGATION_ITEMS.map((item) => (
          <GoTo key={item.id} href={item.href} aria-label={language.navigation[item.id]} test-id={item.id}>
            {language.navigation[item.id]}
          </GoTo>
        ))}
        <LoginLogout />
      </ul>
    </nav>
  );
}
