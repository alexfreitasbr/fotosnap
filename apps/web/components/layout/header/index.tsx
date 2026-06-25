import { LanguageSwitcher } from "@/components/layout/languageSwitch";
import { NavBar } from "../nav-bar";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 relative border-b border-border" test-id="header">
      <NavBar />
      <LanguageSwitcher />
    </header>
  );
}
