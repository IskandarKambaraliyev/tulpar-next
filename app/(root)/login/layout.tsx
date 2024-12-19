import { Suspense, ReactNode } from "react";

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default LoginLayout;
