import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  const router = useRouter();

  if (
    router.pathname === "/signup" ||
    router.pathname === "/login" ||
    router.pathname === "/reset-password" ||
    router.pathname === "/reset-password/[token]"
  ) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
