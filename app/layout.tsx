import "@radix-ui/themes/styles.css"
import type { Metadata } from "next";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import NavBar from "./NavBar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "UFC Fight Predictor App",
  description: "Predict the winner of UFC fights.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("font-sans", geist.variable)}
    >
      <body>
        {/* <ThemeProvider attribute="class"> */}
          <Theme>
            <NavBar />
            <main className="p-5">
              <Container>{children}</Container>
            </main>
            {/* <ThemePanel /> */}
          </Theme>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
