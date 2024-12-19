import { ReactNode } from "react";

import { AdminHeader } from "@/components/Header";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen flex flex-col">
      <AdminHeader />
      <div className="flex-1 pb-20 bg-gray-50 relative">{children}</div>
    </main>
  );
};

export default AuthLayout;
