import { Poppins, Aboreto } from "next/font/google";
import "../styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "700"],
});

const aboreto = Aboreto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-aboreto",
  weight: ["400"],
});

export default function RootLayout({ children }) {
  return (
      <html lang= className={`${poppins.variable} ${aboreto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
