import { useState } from "react";
import { Form, Link, useActionData, useNavigation, useNavigate } from "@remix-run/react";
import { useAuth } from "~/contexts/auth-context";
import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import FormInput from "~/components/FormInput";
import Button from "~/components/Button";

export const meta: MetaFunction = () => {
  return [
    { title: "ログイン" },
    { name: "description", content: "アカウントにログイン" },
  ];
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // サーバーサイドでは何もせず、クライアントサイドで処理するためにフォームデータを返す
  return json({ email, submitted: true });
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  const isLoading = navigation.state === "submitting";
  const [error, setError] = useState<string | null>(null);

  // フォームがサブミットされたとき
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login({ email, password });
      navigate("/");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("ログインに失敗しました。再度お試しください。");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-light-grey px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="flex justify-center">
            <img className="h-16 w-auto" src="/logo-light.png" alt="ロゴ" />
          </div>
          <h2 className="mt-6 text-center text-h2 text-dark-blue">
            アカウントにログイン
          </h2>
          <p className="mt-2 text-center text-small text-dark-blue/70">
            または{" "}
            <Link
              to="/register"
              className="font-medium text-sky-blue hover:text-sky-blue/80"
            >
              新規登録
            </Link>
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-soft-coral/10 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-soft-coral">エラー</h3>
                <div className="mt-2 text-sm text-soft-coral/90">{error}</div>
              </div>
            </div>
          </div>
        )}

        <Form className="mt-8 space-y-6" method="post" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <FormInput
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              label="メールアドレス"
              placeholder="メールアドレス"
            />
            <FormInput
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              label="パスワード"
              placeholder="パスワード"
            />
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              variant="primary"
              size="md"
              className="w-full"
            >
              {isLoading ? "ログイン中..." : "ログイン"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}