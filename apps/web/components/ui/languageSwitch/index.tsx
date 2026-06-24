"use client";
import { useLanguageStore } from "@/stores/language";

export function LanguageSwitcher() {
  const { locale, setLocale, language } = useLanguageStore();
  return (
    <button onClick={() => setLocale(locale === "pt" ? "en" : "pt")}>
      {language.language}
    </button>
  );
}