import { Outlet, useLocation, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { useAuth } from "~/contexts/auth-context";

/**
 * 認証関連ページのレイアウト
 * このレイアウトは /auth/* パスのルートに適用される
 * 認証済みユーザーが訪れるとホームにリダイレクトする
 */
export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 認証済みユーザーがログインまたは登録ページにアクセスしたらホームにリダイレクト
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate, location.pathname]);

  return <Outlet />;
}