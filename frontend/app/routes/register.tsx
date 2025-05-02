import { redirect } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";

// /registerへのリクエストを_auth.registerにリダイレクト
export const loader = async ({ request }: LoaderArgs) => {
  return redirect("/auth/register");
};

export default function Register() {
  return null;
}