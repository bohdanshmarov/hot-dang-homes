import { gql } from "@apollo/client";
import client from "client";

const handler = async (req, res) => {
  try {
    const filters = req.body;
    const page = filters.page || 1;
    const pageSize = 3;

    // Собираем массив мета-запросов
    const metaArray = [];

    if (filters.hasParking) {
      metaArray.push({
        key: "has_parking",
        compare: "EQUAL_TO",
        value: "1",
      });
    }

    if (filters.petFriendly) {
      metaArray.push({
        key: "pet_friendly",
        compare: "EQUAL_TO",
        value: "1",
      });
    }

    if (filters.minPrice) {
      metaArray.push({
        key: "price",
        compare: "GREATER_THAN_OR_EQUAL_TO",
        value: String(filters.minPrice),
        type: "NUMERIC",
      });
    }

    if (filters.maxPrice) {
      metaArray.push({
        key: "price",
        compare: "LESS_THAN_OR_EQUAL_TO",
        value: String(filters.maxPrice),
        type: "NUMERIC",
      });
    }

    console.log("API Filters received:", filters);
    console.log("MetaArray:", metaArray);

    // Формируем базовый объект where
    const where = {
      offsetPagination: {
        size: pageSize,
        offset: (page - 1) * pageSize,
      },
    };

    // Добавляем мета-фильтры только если они есть
    if (metaArray.length > 0) {
      where.metaQuery = {
        relation: "AND",
        metaArray: metaArray,
      };
    }

    console.log("Where query:", JSON.stringify(where, null, 2));

    const { data } = await client.query({
      query: gql`
        query AllPropertiesQuery(
          $where: RootQueryToPropertyConnectionWhereArgs!
        ) {
          properties(where: $where) {
            pageInfo {
              offsetPagination {
                total
              }
            }
            nodes {
              databaseId
              title
              uri
              featuredImage {
                node {
                  sourceUrl
                }
              }
              propertyFeatures {
                price
                bedrooms
                bathrooms
                hasParking
                petFriendly
              }
            }
          }
        }
      `,
      variables: { where },
    });

    console.log(
      "Total results before filtering:",
      data.properties.pageInfo.offsetPagination.total,
    );
    console.log("Results returned:", data.properties.nodes.length);

    return res.status(200).json({
      total: data.properties.pageInfo.offsetPagination.total,
      properties: data.properties.nodes,
    });
  } catch (e) {
    console.error("Search Error:", e);
    return res.status(500).json({ error: "Search failed", message: e.message });
  }
};

export default handler;
