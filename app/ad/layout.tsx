import { AdminHeader } from "@/components/Header";
import { PreviewProvider } from "@/context/PreviewContext";
import { ReactNode, Suspense } from "react";

type Props = {
  children: ReactNode;
};
export default async function AdminPage({ children }: Props) {
  return (
    <PreviewProvider>
      <Suspense>
        <AdminHeader />

        <main className="min-h-[calc(100vh-5rem)] bg-gray-50">{children}</main>
      </Suspense>
    </PreviewProvider>
  );
}
