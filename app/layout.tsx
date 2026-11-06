import "@radix-ui/themes/styles.css"
import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import "./globals.css";
import NavBar from "./NavBar";

export const metadata: Metadata = {
  title: "UFC Fight Predictor App",
  description: "Predict the winner of UFC fights.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={``}
    >
      <body>
        <Theme>
          <NavBar />
          <main className="p-5">
            {children}
          </main>
        </Theme>
      </body>
    </html>
  );
}
