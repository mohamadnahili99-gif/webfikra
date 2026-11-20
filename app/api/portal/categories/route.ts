import { listMenu, mutateMenu } from "@/lib/menu-api";

export const dynamic = "force-dynamic";

export const GET = (request: Request) => listMenu("categories", request);
export const POST = (request: Request) => mutateMenu("categories", request, "POST");
export const PATCH = (request: Request) => mutateMenu("categories", request, "PATCH");
export const DELETE = (request: Request) => mutateMenu("categories", request, "DELETE");
