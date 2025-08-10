// These styles apply to every route in the application
import NavBar from "@/components/navbar";
import "@/styles/globals.css";
import { Metadata } from "next";
import { Open_Sans, Roboto_Mono } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import backgroundImage from "../public/space_x.png";
import { Providers } from "./providers";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  //👇 Add variable to our object
  variable: "--font-opensans",
});

//👇 Configure the object for our second font
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const title = "Space X Launches";
export const metadata: Metadata = {
  title,
  twitter: {
    card: "summary_large_image",
    title,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
  // themeColor moved to viewport.ts per Next.js requirements
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          overflowY: "hidden",
        }}
        className={`${openSans.variable} ${robotoMono.variable} font-sans`}
      >
        <Suspense
          fallback={<p className="text-white font-bold text-2xl">Loading...</p>}
        >
          <Providers>
            <NavBar />
            {children}
            <Toaster />
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
