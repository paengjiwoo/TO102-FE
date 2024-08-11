import React from "react";
import { useRouter } from "@tanstack/react-router";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const router = useRouter();

  const currentPath = router.state.location.pathname;

  const shouldShowHeaderFooter = !currentPath.includes("/login");

  return (
    <>
      {shouldShowHeaderFooter && <Header />}
      {children}
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
}

export default Layout;
