import React, { ReactNode } from "react";  // ✅ React をインポート

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4 text-xl">
        AutoRedirect
      </header>
      <main className="container mx-auto p-4 flex-1">{children}</main>
      <footer className="bg-blue-600 text-white p-4 text-center">
        © 2025 AutoRedirect
      </footer>
    </div>
  );
}

