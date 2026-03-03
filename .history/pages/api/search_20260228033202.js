import { gql } from "@apollo/client";
import client from "client";

const handler = async (req, res) => {
  try {
    const filters = req.body;

    let hasParkingFilter = ``;
    let petFriendlyFilter = ``;
    let minPriceFilter = ``;
    let maxPriceFilter = ``;

    if (filters.hasParking) {
      hasParkingFilter = `
      {
        key: "has_parking"
        compare: EQUAL_TO
        value: "1"
      },
      `;
    }

    if (filters.petFriendly) {
      petFriendlyFilter = `
      {
        key: "pet_friendly"
        compare: EQUAL_TO
        value: "1"
      },
      `;
    }

    if (filters.minPrice) {
      minPriceFilter = `
      {
        key: "price"
        compare: GREATER_THAN_OR_EQUAL_TO
        value: "${filters.minPrice}"
        type: NUMERIC
      },
      `;
    }

    if (filters.maxPrice) {
      maxPriceFilter = `
      {
        key: "price"
        compare: LESS_THAN_OR_EQUAL_TO
        value: "${filters.maxPrice}"
        type: NUMERIC
      }
      `;
    }

    console.log("API Filters received:", filters);

    // Собираем фильтры и удаляем пустые значения
    const metaArrayFilters = [
      hasParkingFilter,
      petFriendlyFilter,
      minPriceFilter,
      maxPriceFilter,
    ]
      .filter((f) => f.trim())
      .join("");

    // Строим where clause
    const whereClause = !metaArrayFilters
      ? `{ 
          offsetPagination: { size: 3, offset: ${
            ((filters.page || 1) - 1) * 3
          } } 
        }`
      : `{ 
          offsetPagination: { size: 3, offset: ${
            ((filters.page || 1) - 1) * 3
          } }
          metaQuery: {
            relation: AND
            metaArray: [
              ${metaArrayFilters}
            ]
          }
        }`;

    const { data } = await client.query({
      query: gql`
        query AllPropertiesQuery {
          properties(where: ${whereClause}) {
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
    });

    console.log("SERVER SIDE: ", data.properties.nodes);
    return res.status(200).json({
      total: data.properties.pageInfo.offsetPagination.total,
      properties: data.properties.nodes,
    });
  } catch (e) {
    console.error("ERROR: ", e);
    return res.status(500).json({ error: "Search failed", message: e.message });
  }
};

export default handler;
