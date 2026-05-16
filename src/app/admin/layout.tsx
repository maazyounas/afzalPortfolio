import { AdminSidebar } from "@/features/admin/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <AdminSidebar />
      <main className="ml-64 min-h-screen p-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
