import type { Metadata, Viewport } from "next";
import { Inter, Noto_Serif, Playfair_Display } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#030A14",
  colorScheme: "dark",
};

// Configure Google Fonts with CSS Variables
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nusaverse.wpygroup.my.id"),
  title: "NUSAVERSE — Budaya Nusantara dalam Dimensi Digital",
  description:
    "NUSAVERSE adalah platform penemuan budaya digital Indonesia yang melestarikan dan memperkenalkan warisan leluhur melalui visual interaktif, arsip bahasa daerah, museum virtual 3D, dan linimasa sejarah nusantara.",
  keywords: [
    "Nusaverse",
    "Budaya Indonesia",
    "Aksara Daerah",
    "Peta Indonesia Interaktif",
    "Museum Virtual 3D",
    "Linimasa Sejarah",
    "SDGs 11",
    "Kebudayaan Nusantara",
  ],
  authors: [{ name: "NUSAVERSE Team" }],
  openGraph: {
    title: "NUSAVERSE — Budaya Nusantara dalam Dimensi Digital",
    description:
      "Jelajahi kekayaan 38 provinsi, pelajari 714 bahasa daerah, dan masuki museum virtual interaktif dalam petualangan melestarikan budaya Indonesia.",
    images: [
      {
        url: "/assets/images/website-preview/webprev.png",
        width: 1200,
        height: 630,
        alt: "NUSAVERSE — Budaya Nusantara dalam Dimensi Digital",
      },
    ],
    type: "website",
    locale: "id_ID",
    url: "https://nusaverse.wpygroup.my.id/",
  },
  twitter: {
    card: "summary_large_image",
    title: "NUSAVERSE — Budaya Nusantara dalam Dimensi Digital",
    description:
      "Jelajahi kekayaan 38 provinsi, pelajari 714 bahasa daerah, dan masuki museum virtual interaktif dalam petualangan melestarikan budaya Indonesia.",
    images: ["/assets/images/indonesia_overview.png"],
  },
  icons: {
    icon: "/assets/images/icons/nusaverse-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* Structured Data (JSON-LD) for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "NUSAVERSE",
              alternateName: "NUSAVERSE — Budaya Nusantara dalam Dimensi Digital",
              url: "https://nusaverse.wpygroup.my.id/",
              description:
                "Platform penemuan budaya digital Indonesia yang melestarikan dan memperkenalkan warisan leluhur melalui visual interaktif, arsip bahasa daerah, museum virtual 3D, dan linimasa sejarah nusantara.",
              inLanguage: ["id", "en"],
              publisher: {
                "@type": "Organization",
                "name": "NUSAVERSE Team",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${notoSerif.variable} ${playfairDisplay.variable} font-sans bg-navy-deepest text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
