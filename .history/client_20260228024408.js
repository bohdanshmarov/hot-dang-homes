import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// On the server we can use WP_GRAPHQL_URL (set in .env.local),
// but the client bundle only has access to variables prefixed with NEXT_PUBLIC_
// so fallback to NEXT_PUBLIC_WP_URL if available.
const graphqlUrl =
  process.env.NEXT_PUBLIC_WP_URL?.replace(/\/+$/g, "") + "/graphql" ||
  process.env.WP_GRAPHQL_URL;

const client = new ApolloClient({
  link: new HttpLink({ uri: graphqlUrl }),
  cache: new InMemoryCache(),
});

export default client;
