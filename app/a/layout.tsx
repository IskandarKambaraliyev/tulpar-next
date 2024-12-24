import { AdminHeader } from "@/components/Header";
import { ReactNode, Suspense } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="w-full min-h-screen flex flex-col bg-gray-50">
      <AdminHeader />
      <div className="flex-1 flex flex-col">
        <Suspense fallback={null}>{children}</Suspense>
      </div>
    </main>
  );
}
