import { ReactNode } from "react";
import { PreviewProvider } from "@/context/PreviewContext";

import { AdminHeader } from "@/components/Header";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <PreviewProvider>
      <main className="min-h-screen flex flex-col admin-main">
        <AdminHeader />
        <div className="flex-1 bg-gray-50 relative">{children}</div>
      </main>
    </PreviewProvider>
  );
};

export default AuthLayout;
