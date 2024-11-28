"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { defaultNewsletterValues, getNewsletterMessage, zNewsletterValues, type NewsletterValues } from "@/lib/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { tv, type ClassValue } from "tailwind-variants";
import IconSubmit from "~icons/bi/envelope-plus.jsx";
import IconSubmitting from "~icons/bi/hourglass-split.jsx";
import { subscribeToNewsletterAction } from "./actions";

// STYLES **********************************************************************************************************************************
const FORM = tv({ base: "flex flex-col gap-4 sm:flex-row sm:items-center" });
const INPUT = "aria-invalid:border-destructive-400 aria-invalid:focus-visible:ring-destructive-400 focus-visible:ring-secondary";

// MAIN ************************************************************************************************************************************
export default function TheNewsletterForm({ className }: TheNewsletterFormProps) {
  const [state, action, isPending] = useActionState(subscribeToNewsletterAction, undefined);

  const message = useMemo(() => getNewsletterMessage(state, isPending), [state, isPending]);

  const form = useForm<NewsletterValues>({
    mode: "onTouched",
    resolver: zodResolver(zNewsletterValues),
    defaultValues: state?.data ?? defaultNewsletterValues,
    errors: state?.errors,
  });
  const { control, formState, handleSubmit, reset } = form;

  useEffect(() => {
    if (message) {
      const { description, status } = message ?? {};
      if (status === 200) {
        reset();
        toast.success("Succès", { description });
      } else toast.error("Erreur", { description });
    }
  }, [message, reset]);

  return (
    <Form {...form}>
      <form action={action} onSubmit={formState.isValid ? undefined : handleSubmit(() => true)} className={FORM({ className })}>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full sm:max-w-xs xl:max-w-sm">
              <FormControl>
                <Input type="email" placeholder="Votre courriel..." {...field} className={INPUT} />
              </FormControl>
              <FormMessage className="absolute text-destructive-400" />
            </FormItem>
          )}
        />
        <Button type="submit" intent="secondary" disabled={isPending} className="mt-4 w-full justify-center sm:mt-0 sm:w-auto">
          {isPending ? <IconSubmitting></IconSubmitting> : <IconSubmit></IconSubmit>}
          Je m&apos;inscris
        </Button>
      </form>
    </Form>
  );
}

// TYPES *********************************************************************************************************************************
export type TheNewsletterFormProps = {
  className: ClassValue;
};
