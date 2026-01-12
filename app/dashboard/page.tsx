"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Temporariamente desabilitado para visualizar o dashboard
    // const token = typeof window !== "undefined" ? localStorage. getItem("nm_token") : null;
    // if (! token) {
    //   router.replace("/login");
    // } else {
    //   setReady(true);
    // }
    setReady(true);
  }, [router]);

  if (!ready) {
    return null;
  }
  return (
    <div className="min-h-screen center-screen">
      <div className="container">Bem-vindo ao dashboard</div>
    </div>
  );
}