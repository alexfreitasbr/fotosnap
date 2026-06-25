import { LanguageSwitcher } from "@/components/layout/languageSwitch";
import { NavBar } from "../nav-bar";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 fixed top-0 left-0 right-0  bg-white-100 border-b border-border z-10 sm:relative" test-id="header">
      <NavBar />
      <LanguageSwitcher />
    </header>
  );
}
