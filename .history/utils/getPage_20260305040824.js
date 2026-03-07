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
          }
          ... on Property {
            id
            title
            blocks(postTemplate: false)
          }
        }
       
        }
      }
    `,
    variables: { uri },
  };

  // 1. Перевір назву змінної: зазвичай для запитів використовується WP_GRAPHQL_URL
  const response = await fetch(
    process.env.WP_GRAPHQL_URL || process.env.WP_IMAGE_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    },
  );

  const { data } = await response.json();
  const blocks = cleanAndTransformBlocks(data?.nodeByUri?.blocks);

  if (!blocks) {
    return null;
  }

  return blocks;
};
