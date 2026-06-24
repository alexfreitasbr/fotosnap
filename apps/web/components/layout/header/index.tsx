"use client";

import { LanguageSwitcher } from "@/components/ui/languageSwitch";
import { useLanguageStore } from "@/stores/language";
import Link from "next/link";

export function Header() {
  const { language } = useLanguageStore();
  return (
    <header className="flex items-center justify-between p-4">
      <nav>
        <ul>
          <li>
            <Link href="/">{language.home.title}</Link>
          </li>
        </ul>
      </nav>
      <LanguageSwitcher />
    </header>
  );
}
