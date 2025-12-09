import { type ApiHealthResponse } from "@/lib/types";

export const runtime = "nodejs";

export function GET(): Response {
  const body: ApiHealthResponse = {
    status: "ok",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version ?? "unknown",
  };

  return Response.json(body, { status: 200 });
}
