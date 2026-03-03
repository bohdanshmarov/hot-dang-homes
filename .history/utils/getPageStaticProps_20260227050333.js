import { gql } from "@apollo/client";
import client from "client";
import { cleanAndTransformBlocks } from "./cleanAndTranformBlocks";
import { mapMainMenuItems } from "./mapMainMenuItems";

export const getPageStaticProps = async (context) => {
  const uri = "/" + (context.params?.slug ? context.params.slug.join("/") : "");
  const { data } = await client.query({
    query: gql`
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
  });

  return {
    props: {
      mainMenuItems: mapMainMenuItems(
        data?.acfOptionsMainMenu?.mainMenu?.menuItems || [],
      ),
      callToActionLabel:
        data?.acfOptionsMainMenu?.mainMenu?.callToActionButton?.label,
      callToActionDestination:
        data?.acfOptionsMainMenu?.mainMenu?.callToActionButton?.destination
          ?.uri,
      blocks: cleanAndTransformBlocks(data?.nodeByUri?.blocks),
    },
  };
};
