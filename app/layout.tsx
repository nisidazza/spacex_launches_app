// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Open_Sans, Roboto_Mono } from "next/font/google";
import { Suspense } from "react";
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
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{ minHeight: "100vh" }}
        className={`${openSans.variable} ${robotoMono.variable} font-sans`}
      >
        {/* <Toaster /> */}
        <Suspense fallback="Loading...">
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
