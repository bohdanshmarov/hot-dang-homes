import { gql } from "@apollo/client";
import client from "client";
import { Page } from "components/Page";
import { getPageStaticProps } from "utils/getPageStaticProps";

export default Page;

export const getStaticProps = getPageStaticProps;

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query AllPagesQuery {
        pages {
          nodes {
            uri
          }
        }
        properties {
          nodes {
            uri
          }
        }
      }
    `,
  });

  return {
    paths: [...data.pages.nodes, ...data.properties.nodes].map((page) => ({
      params: {
        // Имя ключа должно совпадать с именем файла [...slug].js
        slug: page.uri.split("/").filter(Boolean),
      },
    })),
    fallback: "blocking",
  };
};
