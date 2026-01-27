"use client"
import Nav from "@components/Nav.js";
import Dashboard from "./page.js";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname()
    return (
        <section>
            <Dashboard>
                {pathname === '/dashboard' ? <div className="absolute top-[50%] bottom-[50%] left-[45%]">Bem-vindo ao Nightmusic!</div>
                    :
                    children}
            </Dashboard>
        </section>
    );
}