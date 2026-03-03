// Avoid disabling TLS certificate verification in code. If you were
// setting `NODE_TLS_REJECT_UNAUTHORIZED = "0"` for local dev, prefer
// configuring the environment for the dev shell instead.
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { Page } from "components/Page";
import { getPageStaticProps } from "utils/getPageStaticProps";

export default Page;

export const getStaticProps = getPageStaticProps;
