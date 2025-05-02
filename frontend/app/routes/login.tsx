import { redirect } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";

// /loginへのリクエストを_auth.loginにリダイレクト
export const loader = async ({ request }: LoaderArgs) => {
  return redirect("/auth/login");
};

export default function Login() {
  return null;
}