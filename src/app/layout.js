import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import {Inter as FontSans} from "next/font/google"
import { cn } from "@/lib/utils"
import Navbar from "@/components/Navbar";
import '@radix-ui/themes/styles.css';
import {Theme} from "@radix-ui/themes";
import {AxiosProvider} from "@/context/AxiosContext";
import Head from "next/head";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata = {
  title: "IntelliChat",
  description: "IntelliChat is a chatbot that uses Llama3.1 to generate responses.",
};

export default function RootLayout({ children }) {
  return (

    <html lang="en">
    <Head>
        <link rel="icon" href="/logo.ico" />
    </Head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
      <ReactQueryProvider>
          <AxiosProvider>
          <Theme>
          <Navbar/>
            {children}
          </Theme>
          </AxiosProvider>
      </ReactQueryProvider>
      </body>
    </html>
  );
}
