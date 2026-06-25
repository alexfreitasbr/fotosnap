import type { SignInValues, SignUpValues } from "@/lib/schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
}

export class AuthApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AuthApiError";
    this.status = status;
  }
}

/**
 * Sends an authenticated request to the backend auth API.
 *
 * @param path API path relative to the backend base URL.
 * @param init Optional fetch configuration.
 * @returns Parsed JSON response.
 */
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      message?: string | string[];
    } | null;

    const message = body?.message ?? "Request failed";
    const text = Array.isArray(message) ? message.join(", ") : message;

    throw new AuthApiError(text, response.status);
  }

  return response.json() as Promise<T>;
}

/**
 * Registers a new user account.
 *
 * @param data Sign-up form values.
 * @returns Authenticated user and access token.
 */
export function signUp(data: SignUpValues): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Authenticates an existing user.
 *
 * @param data Sign-in form values.
 * @returns Authenticated user and access token.
 */
export function signIn(data: SignInValues): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

const AUTH_CHANGE_EVENT = "auth-change";

/**
 * Notifies listeners that the auth session changed.
 */
function notifyAuthChange(): void {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

/**
 * Returns the stored auth session user, if any.
 *
 * @returns Authenticated user or null when there is no valid session.
 */
export function getAuthSession(): AuthUser | null {
  const token = localStorage.getItem("accessToken");
  const storedUser = localStorage.getItem("user");

  if (!token || !storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    return null;
  }
}

/**
 * Persists the auth session in local storage.
 *
 * @param auth Authentication response from the API.
 */
export function saveAuthSession(auth: AuthResponse): void {
  localStorage.setItem("accessToken", auth.accessToken);
  localStorage.setItem("user", JSON.stringify(auth.user));
  notifyAuthChange();
}

/**
 * Removes the auth session from local storage.
 */
export function clearAuthSession(): void {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  notifyAuthChange();
}

export { AUTH_CHANGE_EVENT };
