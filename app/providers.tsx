"use client";

import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      container={{
        element: "recap",
        parameters: {
          badge: "inline",
          theme: "dark",
        },
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};

export default Providers;
