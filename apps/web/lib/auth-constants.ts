/** Cookie name read by middleware to protect authenticated routes. */
export const AUTH_TOKEN_COOKIE = "auth_token";

/** Cookie lifetime in seconds (7 days). */
export const AUTH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7;
