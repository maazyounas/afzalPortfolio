"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-neutral-950 text-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <AdminSidebar />
      <main className="min-h-screen px-4 pb-8 pt-20 sm:px-6 lg:pl-72 lg:px-8 lg:pt-8">
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
