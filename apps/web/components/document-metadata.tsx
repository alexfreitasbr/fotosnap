"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/stores/language";

/**
 * Keeps document title and meta description in sync with the active locale.
 *
 * Server-rendered metadata uses the default locale; this updates the DOM
 * when the user switches language on the client.
 *
 * @returns Renders nothing.
 */
export function DocumentMetadata() {
  const { language } = useLanguageStore();

  useEffect(() => {
    document.title = language.common.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", language.common.description);
    }
  }, [language]);

  return null;
}
