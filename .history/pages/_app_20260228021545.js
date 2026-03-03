import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  // debug: check NODE_ENV at runtime
  if (typeof window === 'undefined') {
    console.log('Server-side NODE_ENV:', process.env.NODE_ENV);
  } else {
    console.log('Client-side NODE_ENV:', process.env.NODE_ENV);
  }

  return (
    <div className="font-body">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
