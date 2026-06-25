import { z } from "zod";
import type { pt } from "@/core/locales/pt";

type ValidationMessages = typeof pt.errors;

function createPasswordSchema(errors: ValidationMessages) {
  return z
    .string()
    .min(8, errors.passwordMinLength)
    .regex(/[A-Z]/, errors.passwordUppercase)
    .regex(/[a-z]/, errors.passwordLowercase)
    .regex(/[0-9]/, errors.passwordNumber)
    .regex(/[^A-Za-z0-9]/, errors.passwordSpecial);
}

export function createSignUpSchema(errors: ValidationMessages) {
  return z
    .object({
      name: z.string().min(2, errors.nameMinLength),
      email: z
        .email(errors.emailInvalid)
        .transform((email) => email.toLowerCase()),
      password: createPasswordSchema(errors),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: errors.confirmPassword,
      path: ["confirmPassword"],
    });
}

export function createSignInSchema(errors: ValidationMessages) {
  return z.object({
    email: z
      .email(errors.emailInvalid)
      .transform((email) => email.toLowerCase()),
    password: createPasswordSchema(errors),
  });
}

export type SignUpValues = z.infer<ReturnType<typeof createSignUpSchema>>;
export type SignInValues = z.infer<ReturnType<typeof createSignInSchema>>;
