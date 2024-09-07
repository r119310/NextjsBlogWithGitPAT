import "../styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Menu from "@/components/layout/Menu";
import { GoogleTagManager } from "@next/third-parties/google";
import { preloadTheme } from "@/lib/themeManager";
import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { notoSansJp } from "@/lib/font";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head prefix="og: http://ogp.me/ns#">
        <script dangerouslySetInnerHTML={{ __html: `(${preloadTheme.toString()})()` }} />
        <link rel="alternate" href="/feed" type="application/atom+xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className={`transition-colors ${notoSansJp.className} min-h-vh bg-gray-100 dark:bg-slate-900 dark:text-slate-400`}>
        <NextTopLoader
          color="#3B82F6"
          template='<div style="height: .15rem;" class="bar" role="bar"><div class="peg"></div></div> 
                    <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          shadow={false}
          showSpinner={false}
          zIndex={100}
        />
        <Header />
        <div className="transition-colors md:flex bg-gray-100 justify-center dark:bg-slate-900">
          <Menu />
          {children}
        </div>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
      <GoogleTagManager gtmId={process.env.GTM_ID!} />
    </html>
  );
}
