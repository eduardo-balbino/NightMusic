"use client";

import { usePathname } from "next/navigation";
import LoginForm from "./LoginForm.js";
import RegisterForm from "./RegisterForm.js";
import ForgotPasswordForm from "./ForgotPasswordForm.js";

export default function AuthTabs() {
  const pathname = usePathname() || "/login";
  let content = null;
  if (pathname.includes("/register")) {
    content = <RegisterForm />;
  } else if (pathname.includes("/forgot")) {
    content = <ForgotPasswordForm />;
  } else {
    content = <LoginForm />;
  }
  return (
    <div className="auth-wrapper">
      <div className="tab-panel p-4 rounded-b-md">{content}</div>
    </div>
  );
}
