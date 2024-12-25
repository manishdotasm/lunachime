import { Providers } from "@/utilities/providers";
import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full">
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <Toaster richColors className="z-100" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
