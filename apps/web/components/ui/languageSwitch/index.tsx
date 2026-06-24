"use client";
import { useLanguageStore } from "@/stores/language";
import { BR, US } from 'country-flag-icons/react/3x2';

export function LanguageSwitcher() {
  const { locale, setLocale} = useLanguageStore();
  return (
    <button onClick={() => setLocale(locale === "pt" ? "en" : "pt")}>
      {locale === 'pt' ? <BR title="Brasil" className="w-6 h-6" /> : <US title="Estados Unidos" className="w-6 h-6" />} 
    </button>
  );
}