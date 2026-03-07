import { cleanAndTransformBlocks } from "./cleanAndTranformBlocks";

export const getPage = async (uri) => {
  const params = {
    query: `
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            title
            blocks(postTemplate: false)
            seo {
              title
              metaDesc
            }
          }
          ... on Property {
            id
            title
            blocks(postTemplate: false)
          }
        }
      }
    `,
    variables: {
      // Якщо uri порожній або undefined, запитуємо головну "/"
      uri: uri || "/",
    },
  };

  try {
    const response = await fetch(process.env.WP_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const json = await response.json();

    if (json.errors) {
      console.error("GraphQL Errors:", json.errors);
      return null;
    }

    if (!json.data?.nodeByUri) {
      return null;
    }

    // Перетворюємо блоки
    const blocks = cleanAndTransformBlocks(json.data.nodeByUri.blocks || []);

    return {
      blocks,
      title: json.data.nodeByUri.title,
    };
  } catch (error) {
    console.error("GetPage Error:", error);
    return null;
  }
};
