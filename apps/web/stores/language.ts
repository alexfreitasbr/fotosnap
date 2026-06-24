import { en, pt } from "../locales";
import { create } from "zustand";

type Locale = "pt" | "en";

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
    default:
      return pt;
  }
}