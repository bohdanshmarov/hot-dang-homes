import { Poppins, Aboreto } from "next/font/google";
import "../styles/globals.css";
import { getMenu } from "utils/getMenu";
import { MainMenu } from "components/MainMenu";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

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

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${aboreto.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body">
        <MainMenu
          callToActionDestination={data.callToActionDestination}
          callToActionLabel={data.callToActionLabel}
          items={data.mainMenuItems}
        />
        {children}
      </body>
    </html>
  );
}
