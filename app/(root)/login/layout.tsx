import React, { Suspense } from "react";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default LoginLayout;
