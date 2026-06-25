"use client";
import { type Locale, useLanguageStore } from "@/stores/language";
import { BR, US, DE, ES, FR, IT } from 'country-flag-icons/react/3x2';

const LOCALES = ["pt", "en", "de", "es", "fr", "it"] as const satisfies readonly Locale[];

export function LanguageSwitcher() {
  const {setLocale, locale, language} = useLanguageStore();

  const flags: Record<Locale, React.ReactNode> = {
    pt: <BR title={language.language} className="w-6 h-6" />,
    en: <US title={language.language} className="w-6 h-6" />,
    de: <DE title={language.language} className="w-6 h-6" />,
    es: <ES title={language.language} className="w-6 h-6" />,
    fr: <FR title={language.language} className="w-6 h-6" />,
    it: <IT title={language.language} className="w-6 h-6" />,
  };

  const getFlags = (currentLocale: Locale) => flags[currentLocale];

  return (
    <ul className="absolute top-4.5 right-6 flex flex-col h-[22px] overflow-hidden items-center cursor-pointer px-2  hover:h-[150px] hover:bg-gray-500/9 transition-all duration-500" role="menu" aria-labelledby="language-switch" test-id="language-switch">
      <li role="menuitem" aria-label="Português" test-id="language-switch-pt">{getFlags(locale)}</li>
      {LOCALES.map((key) => (
        <li key={key} role="menuitem" aria-label={language.language} test-id={`language-switch-${key}`} onClick={() => setLocale(key)} className={`${locale !== key || "hidden"}` }>{getFlags(key)}</li>
      ))}
    </ul>
  );  
}

