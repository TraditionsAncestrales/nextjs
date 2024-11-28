import { env } from "@/env";
import type { TypedPocketbase } from "@/lib/pocketbase/schemas";
import Pocketbase from "pocketbase";
import { helpersFrom } from "zod-pocketbase";

// let pocketbase: TypedPocketbase;

export const pocketbase: TypedPocketbase = new Pocketbase(env.ZOD_POCKETBASE_URL);
pocketbase.autoCancellation(false);
pocketbase.beforeSend = (url, options) => ({ url, options: { ...options, cache: "force-cache" } });

export const { getRecord, getRecords } = helpersFrom({ pocketbase });

export function getPocketbase() {
  // if (!pocketbase) {
  //   pocketbase = new Pocketbase(env.ZOD_POCKETBASE_URL);
  //   pocketbase.autoCancellation(false);
  // }
  return pocketbase;
}
