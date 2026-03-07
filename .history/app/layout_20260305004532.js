import { Poppins, Aboreto } from "next/font/google";
import "../styles/globals.css";
import { getMenu } from "utils/getMenu";

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

export default async function RootLayout({ children }) {
  const data = await getMenu();
  console.log(data);
  return (
    <html lang="en" className={`${poppins.variable} ${aboreto.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
