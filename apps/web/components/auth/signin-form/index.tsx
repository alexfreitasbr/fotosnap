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
import { signInSchema, SignInValues } from "@/lib/schema";
import  {useState} from "react";
import { useLanguageStore } from "@/stores/language";

type SignInFormProps = {
  onSubmit: (values: SignInValues) => void;
}

export default function SignInForm({ onSubmit }: SignInFormProps) {
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { language } = useLanguageStore();

  const [submiting, setSubmiting] = useState(false);

  function handleSubmit(values: SignInValues) {
    setSubmiting(true);
      try {
        onSubmit(values);
      } catch (error) {
        console.error("Error submitting signUp form", error);
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
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
