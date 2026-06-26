"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Loading} from "@/components/ui/loading";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SignUpValues } from "@/lib/schema";
import { useState } from "react";
import { useLanguageStore } from "@/stores/language.store";
import { useSignUpSchema } from "@/hooks/use-auth-schemas";

type SignUpFormProps = {
  onSubmit: (values: SignUpValues) => void | Promise<void>;
  errorMessage?: string;
}

export default function SignUpForm({ onSubmit, errorMessage }: SignUpFormProps) {
  const locale = useLanguageStore((state) => state.locale);

  return (
    <SignUpFormFields
      key={locale}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
}

function SignUpFormFields({ onSubmit, errorMessage }: SignUpFormProps) {
  const signUpSchema = useSignUpSchema();
  const { language } = useLanguageStore();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [submiting, setSubmiting] = useState(false);

  async function handleSubmit(values: SignUpValues) {
    setSubmiting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      console.error("Error submitting signUp form", error);
    } finally {
      setSubmiting(false);
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>{language.signup.header}</CardTitle>
        <CardDescription>
          {language.signup.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="signup-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <FieldGroup>
          <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-name">{language.common.name}</FieldLabel>
                  <Input
                    {...field}
                    id="signup-name"
                    type="text"
                    placeholder={language.common.placeholderName}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-email">{language.common.email}</FieldLabel>
                  <Input
                    {...field}
                    id="signup-email"
                    type="email"
                    placeholder={language.common.placeholderEmail}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-password">{language.common.password}</FieldLabel>
                  <Input
                    {...field}
                    id="signup-password"
                    type="password"
                    placeholder={language.common.placeholderPassword}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-confirm-password">{language.common.confirmPassword}</FieldLabel>
                  <Input
                    {...field}
                    id="signup-confirm-password"
                    type="password"
                    placeholder={language.common.placeholderPassword}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button type="submit" className="w-full" disabled={submiting}>
            {submiting ? <Loading text={language.signup.submittingButton} />: language.signup.signupButton}
            </Button>
            {errorMessage ? (
              <p className="text-sm text-destructive" role="alert">
                {errorMessage}
              </p>
            ) : null}
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
