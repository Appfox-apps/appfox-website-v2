import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Archivo, Geist, Geist_Mono, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { FlagValues } from "flags/react";
import { site } from "@/lib/site";
import { getDesign } from "@/lib/design";
import { FLAG_KEY } from "@/lib/flag-key";
import { JsonLd } from "@/components/seo/JsonLd";
import { CrispChat } from "@/components/site/CrispChat";
import { DesignProvider } from "@/components/site/DesignProvider";
import "./globals.css";
import "./control.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Archivo({
  variable: "--font-display-family",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    template: "%s | AppFox",
    default: "AppFox - Shopify Apps for Order Editing, Upsells & Subscriptions",
  },
  description:
    "Shopify apps for the whole order journey: self-service order editing with one-click upsells, and subscriptions that start right on the product page. Install free in 5 minutes.",
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "AppFox",
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export async function generateViewport(): Promise<Viewport> {
  const design = await getDesign();
  return { themeColor: design === "brutalist" ? "#0a0a0a" : "#f5f3fa" };
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: `${site.url}/`,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/icon.svg`,
      },
      email: site.supportEmail,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: site.supportEmail,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const design = await getDesign();
  return (
    <html
      lang="en"
      data-design={design}
      // the inline head script adds .js before hydration - expected mismatch
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${display.variable} ${mono.variable} h-full`}
    >
      <head>
        {/* Gate hidden pre-animation states behind html.js so content is
            always visible to crawlers and no-JS users (LCP/SEO guardrail) */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <DesignProvider design={design}>
        <JsonLd data={organizationJsonLd} />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VXQLZNGNF1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VXQLZNGNF1');
          `}
        </Script>
        
        {children}
        <Suspense fallback={null}>
          <FlagValues values={{ [FLAG_KEY]: design }} />
        </Suspense>
        <Analytics />
        <CrispChat />
        </DesignProvider>
      </body>
    </html>
  );
}