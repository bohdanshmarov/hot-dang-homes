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
        acfOptionsMainMenu {
          mainMenu {
            callToActionButton {
              label
              destination {
                ... on Page {
                  uri
                }
              }
            }
            menuItems {
              menuItem {
                label
                destination {
                  ... on Page {
                    uri
                  }
                }
              }
              items {
                label
                destination {
                  ... on Page {
                    uri
                  }
                }
              }
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
	blocks: cleanAndTransformBlocks(data?.nodeByUri?.blocks),

  if (!data) {
    return null;
  }

  return data;
};
