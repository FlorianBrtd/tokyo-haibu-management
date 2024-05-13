import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { locales } from "@/locale-config";
import { unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, useMessages } from "next-intl";
import type { PropsWithChildren } from "react";
import { Navigation } from "@/components/Navigation";

type Props = PropsWithChildren<{
  params: { locale: string };
}>;

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  params: { locale },
  children,
}: Readonly<Props>) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const messages = useMessages();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navigation>{children}</Navigation>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}