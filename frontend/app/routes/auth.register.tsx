import { useState } from "react";
import { Form, Link, useActionData, useNavigation, useNavigate } from "@remix-run/react";
import { useAuth } from "~/contexts/auth-context";
import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import FormInput from "~/components/FormInput";
import Button from "~/components/Button";

export const meta: MetaFunction = () => {
  return [
    { title: "アカウント登録" },
    { name: "description", content: "新規アカウント登録" },
  ];
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");

  // サーバーサイドでは何もせず、クライアントサイドで処理するためにフォームデータを返す
  return json({ name, email, submitted: true });
}

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  const isLoading = navigation.state === "submitting";
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // フォームがサブミットされたとき
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordConfirmation = formData.get("password_confirmation") as string;

    try {
      await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      navigate("/");
    } catch (err: any) {
      console.error("Register error:", err);
      
      if (err.response?.data?.errors) {
        // バリデーションエラーの処理
        setErrors(err.response.data.errors);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("登録に失敗しました。再度お試しください。");
      }
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
            アカウント登録
          </h2>
          <p className="mt-2 text-center text-small text-dark-blue/70">
            または{" "}
            <Link
              to="/login"
              className="font-medium text-sky-blue hover:text-sky-blue/80"
            >
              既存アカウントでログイン
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
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              label="ユーザー名"
              placeholder="ユーザー名"
              error={errors.name}
            />

            <FormInput
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              label="メールアドレス"
              placeholder="メールアドレス"
              error={errors.email}
            />

            <FormInput
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              label="パスワード"
              placeholder="パスワード"
              error={errors.password}
            />

            <FormInput
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              autoComplete="new-password"
              required
              label="パスワード（確認）"
              placeholder="パスワード（確認）"
              error={errors.password_confirmation}
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
              {isLoading ? "登録中..." : "登録"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}