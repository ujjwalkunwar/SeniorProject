import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Navigationbar from "./components/navigationbar/Navigationbar"
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import getCurrentUser from "./actions/getCurrentUser";
import SearchModal from "./components/modals/SearchModal";
import ForgotPasswordModal from "./components/modals/ForgotPasswordModal";
export const dynamic = 'force-dynamic'
const rubik = Rubik({ subsets: ["latin"] });

// Type definition for the RootLayout metadata.
export const metadata: Metadata = {
  title: "WanderNEST",
  description: "Wanderer's World",
};

/**
 * Component for the root layout of the application.
 * 
 * @async
 * @param {Object} props - The props for the RootLayout component.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} JSX element representing the root layout.
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={rubik.className}>
          <ClientOnly>
            <ToasterProvider />
            <SearchModal />
            <RentModal />
            <LoginModal />
            <RegisterModal />
            <ForgotPasswordModal />
            <Navigationbar currentUser={currentUser}/>
          </ClientOnly>
          <div className="
            pb-20 
            pt-28">
            {children}
          </div>
      </body>
    </html>
  );
}