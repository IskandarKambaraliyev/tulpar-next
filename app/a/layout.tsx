import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="w-full min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex flex-col">{children}</div>
    </main>
  );
}
