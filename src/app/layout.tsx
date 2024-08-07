import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import { M_PLUS_2 } from 'next/font/google'

const mplus2 = M_PLUS_2({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head prefix="og: http://ogp.me/ns#">
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${mplus2.className} min-h-vh bg-gray-100`}>
        <Header />
        <div className="md:flex bg-gray-100 justify-center">
          <Menu />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
