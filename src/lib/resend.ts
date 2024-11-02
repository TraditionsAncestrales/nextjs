import { env } from "@/env";
import { Resend } from "resend";

// CLIENT **********************************************************************************************************************************
export const resend = new Resend(env.RESEND_API_KEY);
