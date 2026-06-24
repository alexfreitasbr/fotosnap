"use client";

import { useMemo } from "react";
import { createSignInSchema, createSignUpSchema } from "@/lib/schema";
import { useLanguageStore } from "@/stores/language";

/**
 * Returns a Zod sign-up schema with validation messages in the active locale.
 *
 * @returns Sign-up schema bound to the current language errors.
 */
export function useSignUpSchema() {
  const { language } = useLanguageStore();

  return useMemo(() => createSignUpSchema(language.errors), [language]);
}

/**
 * Returns a Zod sign-in schema with validation messages in the active locale.
 *
 * @returns Sign-in schema bound to the current language errors.
 */
export function useSignInSchema() {
  const { language } = useLanguageStore();

  return useMemo(() => createSignInSchema(language.errors), [language]);
}
