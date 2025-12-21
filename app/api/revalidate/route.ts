import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

type RevalidatePayload = {
  secret?: string;
  paths?: string[];
  slug?: string;
  category?: string;
};

export async function POST(request: Request): Promise<Response> {
  let payload: RevalidatePayload | null = null;

  try {
    payload = (await request.json()) as RevalidatePayload;
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!payload?.secret || payload.secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const paths = new Set<string>();

  if (Array.isArray(payload.paths)) {
    for (const path of payload.paths) {
      if (typeof path === "string" && path.trim()) {
        paths.add(path);
      }
    }
  }

  if (payload.slug) {
    paths.add(`/blog/${payload.slug}`);
    paths.add("/blog");
    paths.add("/");
  }

  if (payload.category) {
    paths.add(`/blog/category/${payload.category}`);
    paths.add("/blog");
  }

  if (!paths.size) {
    return Response.json(
      { ok: false, error: "No paths provided" },
      { status: 400 },
    );
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return Response.json({ ok: true, revalidated: Array.from(paths) });
}
