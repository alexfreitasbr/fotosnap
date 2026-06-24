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
import { SignInValues } from "@/lib/schema";
import { useState } from "react";
import { useLanguageStore } from "@/stores/language";
import { useSignInSchema } from "@/hooks/use-auth-schemas";

type SignInFormProps = {
  onSubmit: (values: SignInValues) => void | Promise<void>;
  errorMessage?: string;
}

export default function SignInForm({ onSubmit, errorMessage }: SignInFormProps) {
  const locale = useLanguageStore((state) => state.locale);

  return (
    <SignInFormFields
      key={locale}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
}

function SignInFormFields({ onSubmit, errorMessage }: SignInFormProps) {
  const signInSchema = useSignInSchema();
  const { language } = useLanguageStore();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [submiting, setSubmiting] = useState(false);

  async function handleSubmit(values: SignInValues) {
    setSubmiting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      console.error("Error submitting signIn form", error);
    } finally {
      setSubmiting(false);
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>{language.login.header}</CardTitle>
        <CardDescription>
        {language.login.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="signin-form"
          onSubmit={form.handleSubmit(handleSubmit)}   
          className="space-y-4"
        >
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signin-email">{language.common.email}</FieldLabel>
                  <Input
                    {...field}
                    id="signin-email"
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
                  <FieldLabel htmlFor="signin-password">{language.common.password}</FieldLabel>
                  <Input
                    {...field}
                    id="signin-password"
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
            {submiting ? <Loading text={language.login.submittingButton} />: language.login.loginButton}
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
