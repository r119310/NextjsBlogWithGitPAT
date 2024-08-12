import "../styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Menu from "@/components/layout/Menu";
import { M_PLUS_2 } from 'next/font/google'
import { GoogleTagManager } from "@next/third-parties/google";

const mplus2 = M_PLUS_2({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head prefix="og: http://ogp.me/ns#">
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="alternate" type="application/atom+xml" href="/feed" />
      </head>
      <body className={`${mplus2.className} min-h-vh bg-gray-100`}>
        <Header />
        <div className="md:flex bg-gray-100 justify-center">
          <Menu />
          {children}
        </div>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.GTM_ID!} />
    </html>
  );
}
