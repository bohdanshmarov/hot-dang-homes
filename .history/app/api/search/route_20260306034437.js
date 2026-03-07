import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const filters = await request.json;

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
      }
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

    const responce = await fetch(process.WP_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: gql`
        query AllPropertiesQuery {
          properties(where: { 
            offsetPagination: { size: 3, offset: ${
              ((filters.page || 1) - 1) * 3
            } }
          metaQuery: {
            relation: AND
            metaArray: [
              ${petFriendlyFilter}
              ${hasParkingFilter}
              ${minPriceFilter}
              ${maxPriceFilter}
            ]
          }
        }) {
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
                  uri
                  sourceUrl
                }
              }
              propertyFeatures {
                bathrooms
                bedrooms
                hasParking
                petFriendly
                price
              }
            }
          }
        }
      `,
      }),
    });

    const data = await responce.json(); // Переконайся, що назва змінної responce (з 'c') правильна

    // 1. Прибираємо той NextResponse.json(), що стояв посеред коду.
    // 2. Обробляємо дані:
    const propertiesWithFeatures = data.properties.nodes.map((prop) => {
      console.log("Property:", prop.title, "Features:", prop.propertyFeatures);
      return prop;
    });

    // 3. Повертаємо фінальну відповідь (Next.js App Router style):
    return NextResponse.json(
      {
        total: data.properties.pageInfo.offsetPagination.total,
        properties: propertiesWithFeatures,
      },
      { status: 200 },
    );
  } catch (e) {
    console.log("ERROR: ", e);
    // У Next.js ми не використовуємо res.status, а повертаємо NextResponse:
    return NextResponse.json(
      { error: "Search failed", message: e.message },
      { status: 500 },
    );
  }
}
