import { listMenu, mutateMenu } from "@/lib/menu-api";

export const GET = (request: Request) => listMenu("items", request);
export const POST = (request: Request) => mutateMenu("items", request, "POST");
export const PATCH = (request: Request) => mutateMenu("items", request, "PATCH");
export const DELETE = (request: Request) => mutateMenu("items", request, "DELETE");
