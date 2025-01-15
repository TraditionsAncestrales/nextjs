import { getAllUrls } from "@/lib/pocketbase";
import { helpers } from "@/lib/pocketbase/sdk";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { tags, token } = z.object({ tags: z.string().array(), token: z.string() }).parse(payload);
    const paths = tags.length === 1 && tags[0] === "all" ? await getAllUrls(helpers) : tags;
    console.log("purging", paths);
    const urls = paths.map((path) => new URL(path, new URL(request.url).origin));
    await Promise.all(urls.map(async (url) => fetch(url, { headers: { "x-prerender-revalidate": token } })));
    return new Response(JSON.stringify("ok"), { status: 200 });
  } catch (error_) {
    console.error(error_);
    return new Response(JSON.stringify("error"), { status: 500 });
  }
}
