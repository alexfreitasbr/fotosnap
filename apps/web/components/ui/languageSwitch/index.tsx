"use client";
import { useLanguageStore } from "@/stores/language";
import { BR, US, DE, ES, FR, IT } from 'country-flag-icons/react/3x2';

export function LanguageSwitcher() {
  const {setLocale, locale} = useLanguageStore();


  const getFlags = () => {
    const flags = [
      { locale: "pt", flag: <BR title="Português" className="w-6 h-6" /> },
      { locale: "en", flag: <US title="English" className="w-6 h-6" /> },
      { locale: "de", flag: <DE title="Deutsch" className="w-6 h-6" /> },
      { locale: "es", flag: <ES title="Español" className="w-6 h-6" /> },
      { locale: "fr", flag: <FR title="Français" className="w-6 h-6" /> },
      { locale: "it", flag: <IT title="Italiano" className="w-6 h-6" /> },  
    ];
    return flags.find((flag) => flag.locale === locale)?.flag;
  };

  return (
    <ul className="absolute top-4 right-6 flex flex-col h-[22px] overflow-hidden items-center cursor-pointer px-2  hover:h-[150px] hover:bg-gray-500/9 transition-all duration-500">
      <li >{getFlags()}</li>
      {locale !== "pt" && <li onClick={() => setLocale("pt")}><BR title="Português" className="w-6 h-6" /></li>}
      {locale !== "en" && <li onClick={() => setLocale("en")}><US title="English" className="w-6 h-6" /></li>}
      {locale !== "de" && <li onClick={() => setLocale("de")}><DE title="Deutsch" className="w-6 h-6" /></li>}
      {locale !== "es" && <li onClick={() => setLocale("es")}><ES title="Español" className="w-6 h-6" /></li>}
      {locale !== "fr" && <li onClick={() => setLocale("fr")}><FR title="Français" className="w-6 h-6" /></li>}
      {locale !== "it" && <li onClick={() => setLocale("it")}><IT title="Italiano" className="w-6 h-6" /></li>}
    </ul>
  );
}

