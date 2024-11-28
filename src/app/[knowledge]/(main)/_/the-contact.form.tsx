"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { defaultContactValues, getContactMessage, zContactValues, type ContactValues } from "@/lib/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { tv, type ClassValue } from "tailwind-variants";
import IconSubmit from "~icons/bi/envelope-plus.jsx";
import IconSubmitting from "~icons/bi/hourglass-split.jsx";
import { sendMessageAction } from "./actions";

// STYLES **********************************************************************************************************************************
const FORM = tv({ base: "flex flex-col gap-4" });

// MAIN ************************************************************************************************************************************
export default function TheContactForm({ className }: TheContactFormProps) {
  const [state, action, isPending] = useActionState(sendMessageAction, undefined);

  const message = useMemo(() => getContactMessage(state, isPending), [state, isPending]);

  const form = useForm<ContactValues>({
    mode: "onTouched",
    resolver: zodResolver(zContactValues),
    defaultValues: state?.data ?? defaultContactValues,
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
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Votre nom</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Votre courriel</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Votre message</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="flex gap-2 self-end">
          {isPending ? <IconSubmitting></IconSubmitting> : <IconSubmit></IconSubmit>}
          Envoyer
        </Button>
      </form>
    </Form>
  );
}

// TYPES *********************************************************************************************************************************
export type TheContactFormProps = {
  className: ClassValue;
};
