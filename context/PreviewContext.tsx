"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface PreviewContextProps {
  preview: string;
  setPreview: (preview: string) => void;
  previewWidth: number;
  setPreviewWidth: (width: number) => void;
}

const PreviewContext = createContext<PreviewContextProps | undefined>(
  undefined
);

export const PreviewProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [preview, setPreview] = useState<string>("");
  const [previewWidth, setPreviewWidth] = useState<number>(384);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pre = localStorage.getItem("preview");

    const curPreview =
      pre === "no-preview" || pre === "only-preview" ? pre : "both";
    setPreview(curPreview);

    const width = localStorage.getItem("previewWidth");
    const parsedWidth =
      width && !isNaN(parseInt(width)) ? parseInt(width) : 384;
    const maxAllowedWidth = window.innerWidth - 400;

    const validWidth =
      parsedWidth >= 384 && parsedWidth <= maxAllowedWidth ? parsedWidth : 384;

    setPreviewWidth(validWidth);
  }, []);

  useEffect(() => {
    localStorage.setItem("preview", preview);
  }, [preview]);

  useEffect(() => {
    localStorage.setItem("previewWidth", previewWidth.toString());
  }, [previewWidth]);

  return (
    <PreviewContext.Provider
      value={{
        preview,
        setPreview,
        previewWidth,
        setPreviewWidth,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
};

export const usePreview = (): PreviewContextProps => {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error("usePreview must be used within a PreviewProvider");
  }
  return context;
};
