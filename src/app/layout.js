import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import { Toaster } from "../components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Online Code Editor & Static Website Hosting",
  description: "Try our fully functional online code editor and static website hosting services.",
  keywords: "online code editor, static website hosting, web development, HTML editor, CSS editor, JavaScript editor, website hosting",
  author: "Akdevz",
  robots: "index, follow",
  canonical: "https://www.akdevz.online", 
  openGraph: {
    title: "Online Code Editor & Static Website Hosting",
    description: "Use our fully functional online code editor and host static websites with ease.",
    url: "https://www.akdevz.online", 
    type: "website",
    images: [
      {
        url: "https://www.akdevz.online/code.webp", // Replace with your image URL
        width: 1200,
        height: 630,
        alt: "Online Code Editor and Hosting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourcompany", // Replace with your Twitter handle
    title: "Online Code Editor & Static Website Hosting",
    description: "Check out our fully functional online code editor and website hosting services.",
    image: "https://www.yourwebsite.com/code.webp", // Replace with your image URL
  },
};


export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${inter.className} dark`} >
        <Navbar />
              <div className=" w-full mx-auto h-auto min-h-screen pt-16">
                {children}
                <Toaster />
              </div>
      </body>
    </html>
  );
}
