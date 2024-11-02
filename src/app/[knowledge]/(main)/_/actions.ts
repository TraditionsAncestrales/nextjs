"use server";

import { env } from "@/env";
import { formAction, zContactValues, zNewsletterValues } from "@/lib/form";
import { resend } from "@/lib/resend";
import mailchimp from "@mailchimp/mailchimp_marketing";
import md5 from "md5";

// SEND MESSAGE ****************************************************************************************************************************
export const sendMessageAction = formAction({
  input: zContactValues,
  handler: async (data) => {
    const { email, fullname, message: content } = data;
    const { error } = await resend.emails.send({
      from: "contact@traditionsancestrales.fr",
      to: "niama.traditions.ancestrales@gmail.com",
      subject: "Formulaire de contact",
      html: `<dl><dt>Nom :</dt><dd>${fullname}</dd><dt>Courriel :</dt><dd>${email}</dd><dt>Message :</dt><dd>${content}</dd></dl>`,
    });
    if (error) return { data, status: 400 };
    return { status: 200 };
  },
});

// SUBSCRIBE TO NEWSLETTER *****************************************************************************************************************
export const subscribeToNewsletterAction = formAction({
  input: zNewsletterValues,
  handler: async (data) => {
    const { email } = data;
    const listId = env.MAILCHIMP_LIST_ID;
    if (!listId) return { data, status: 400 };
    const subscriberHash = md5(email.toLowerCase());
    mailchimp.setConfig({ apiKey: env.MAILCHIMP_API_KEY, server: env.MAILCHIMP_SERVER });
    try {
      const { status } = await mailchimp.lists.getListMember(listId, subscriberHash);
      if (status !== "unsubscribed") return { data, status: 409 };
      await mailchimp.lists.updateListMember(listId, subscriberHash, { status: "subscribed" });
    } catch (error) {
      try {
        await mailchimp.lists.addListMember(listId, { email_address: email, status: "subscribed" });
      } catch (error) {
        return { data, status: 400 };
      }
    }
    return { status: 200 };
  },
});
