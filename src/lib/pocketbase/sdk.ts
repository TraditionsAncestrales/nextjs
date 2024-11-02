import { env } from "@/env";
import PocketBase from "pocketbase";
import { helpersFrom } from "zod-pocketbase";

export const pocketbase = new PocketBase(env.ZOD_POCKETBASE_URL);
pocketbase.autoCancellation(false);

export const { getRecord, getRecords } = helpersFrom({ pocketbase });
