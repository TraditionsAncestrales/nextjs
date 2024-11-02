import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    MAILCHIMP_API_KEY: z.string().min(1),
    MAILCHIMP_LIST_ID: z.string().min(1),
    MAILCHIMP_SERVER: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    ZOD_POCKETBASE_ADMIN_EMAIL: z.string().email(),
    ZOD_POCKETBASE_ADMIN_PASSWORD: z.string().min(1),
    ZOD_POCKETBASE_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_IMGIX_URL: z.string().url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_IMGIX_URL: process.env.NEXT_PUBLIC_IMGIX_URL,
  },
});
