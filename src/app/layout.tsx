import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider} from "@/lib/frontend/redux/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ReduxProvider>{children}</ReduxProvider>
      <ToastContainer />
      </body>
    </html>
  );
}
