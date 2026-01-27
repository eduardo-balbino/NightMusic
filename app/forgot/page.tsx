import logo from "../assets/icons/Iconarchive-Fairy-Tale-Dark-Moon.512.png";
import AuthTabs from "@components/AuthTabs";
import React from "react";

export default function ForgotPage() {
  return (
    <div className="min-h-screen center-screen page-padding">
      <img src={logo.src} alt="logo do app" className="logo-img" />
      <div className="container form-wrapper">
        <AuthTabs />
      </div>
    </div>
  );
}
