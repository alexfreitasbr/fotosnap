import { en, pt, de, es, fr, it } from "../core/locales";
import { create } from "zustand";

export type Locale = "pt" | "en" | "de" | "es" | "fr" | "it";

type LanguageState = {
  locale: Locale;
  language: typeof pt;
  setLocale: (locale: Locale) => void;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  locale: "pt",
  language: pt,
  setLocale: (locale) =>
    set({
      locale,
      language: getLanguage(locale),
    }),
}));

export function getLanguage(locale: Locale) {
  switch (locale) {
    case "pt":
      return pt;
    case "en":
      return en;
    case "de":
      return de;
    case "es":
      return es;
    case "fr":
      return fr;
    case "it":
      return it;
    default:
      return pt;
  }
}