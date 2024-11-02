import type { FieldErrors, FieldValues } from "react-hook-form";
import { z, type AnyZodObject, type ZodError } from "zod";

// FORM ************************************************************************************************************************************
export function formAction<S extends AnyZodObject>({ handler, input }: FormActionOpts<S>) {
  return async (_: ActionState<S["_output"]> | undefined, formData: FormData): Promise<ActionState<S["_output"]>> => {
    try {
      const data = Object.fromEntries(formData.entries()) as z.infer<S>;
      const res = await input.safeParseAsync(data);
      if (!res.success) return { status: 422, data, errors: rhfErrorsFromZod<S["_output"]>(res.error) };
      return handler(res.data);
    } catch (error_) {
      console.error(error_);
      return { status: 400 };
    }
  };
}

function rhfErrorsFromZod<D extends FieldValues = FieldValues>(error: ZodError): FieldErrors<D> {
  const { fieldErrors, formErrors } = error.flatten(({ code: type, message }) => ({ message, type }));
  return {
    root: formErrors[0],
    ...Object.fromEntries(Object.entries(fieldErrors).map(([name, errors]) => [name, errors?.[0]])),
  } as FieldErrors<D>;
}

function getMessageFor(i18n: MessageI18n) {
  return <D extends FieldValues>(state: ActionState<D> | undefined, isPending: boolean): Message | undefined =>
    !state || isPending ? undefined : { description: i18n[state.status] ?? "Erreur inconnue", status: state.status };
}

// CONTACT *********************************************************************************************************************************
export const zContactValues = z.object({
  email: z.string().email("Ce courriel est invalide.").min(1, "Ce champ est requis."),
  fullname: z.string().min(1, "Ce champ est requis."),
  message: z.string().min(1, "Ce champ est requis."),
});
export type ContactValues = z.infer<typeof zContactValues>;

export const defaultContactValues: ContactValues = { email: "", fullname: "", message: "" };

export const getContactMessage = getMessageFor({
  200: "Votre message a été envoyé avec succès.",
  400: "Veuillez réessayer ultérieurement.",
});

// NEWSLETTER ******************************************************************************************************************************
export const zNewsletterValues = z.object({
  email: z.string().email("Ce courriel est invalide.").min(1, "Ce champ est requis."),
});
export type NewsletterValues = z.infer<typeof zNewsletterValues>;

export const defaultNewsletterValues: NewsletterValues = { email: "" };

export const getNewsletterMessage = getMessageFor({
  200: "Veuillez valider votre inscription dans le courriel reçu.",
  400: "Veuillez réessayer ultérieurement.",
  409: "Vous êtes déjà inscrit·e.",
});

// TYPES ***********************************************************************************************************************************
export type ActionState<D extends FieldValues = FieldValues> = {
  data?: D;
  errors?: FieldErrors<D>;
  status: ActionStatus;
};

export type ActionStatus = 200 | 400 | 409 | 422;

export type MessageI18n = Partial<Record<ActionStatus, string>>;
export type Message = { description: string; status: ActionStatus };

type FormActionOpts<S extends AnyZodObject> = { handler: (input: S["_output"]) => Promise<ActionState<S["_output"]>>; input: S };
