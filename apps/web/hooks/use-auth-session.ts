"use client";

import { useEffect, useState } from "react";
import {
  AUTH_CHANGE_EVENT,
  getAuthSession,
  type AuthUser,
} from "@/lib/auth-api";

/**
 * Subscribes to auth session changes in the browser.
 *
 * @param onChange Callback executed when the session is updated.
 * @returns Cleanup function that removes the listener.
 */
function subscribeToAuthChanges(onChange: () => void): () => void {
  window.addEventListener(AUTH_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(AUTH_CHANGE_EVENT, onChange);
}

/**
 * Reads the current authenticated user from local storage.
 *
 * @returns Authenticated user or null when logged out.
 */
export function useAuthSession(): AuthUser | null {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getAuthSession());
    return subscribeToAuthChanges(() => setUser(getAuthSession()));
  }, []);

  return user;
}
