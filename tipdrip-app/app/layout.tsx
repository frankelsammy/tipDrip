import { Metadata } from "next"; 
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "tipdrip",
  description: "Tipping application for service workers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}