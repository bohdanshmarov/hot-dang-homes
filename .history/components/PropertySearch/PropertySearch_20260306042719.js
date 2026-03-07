import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const filters = await request.json();

    let hasParkingFilter = ``;
    let petFriendlyFilter = ``;
    let minPriceFilter = ``;
    let maxPriceFilter = ``;

    if (filters.hasParking) {
      hasParkingFilter = `{
        key: "has_parking",
        compare: EQUAL_TO,
        value: "1"
      },`;
    }

    if (filters.petFriendly) {
      petFriendlyFilter = `{
        key: "pet_friendly",
        compare: EQUAL_TO,
        value: "1"
      },`;
    }

    if (filters.minPrice) {
      minPriceFilter = `{
        key: "price",
        compare: GREATER_THAN_OR_EQUAL_TO,
        value: "${filters.minPrice}",
        type: NUMERIC
      },`;
    }

    if (filters.maxPrice) {
      maxPriceFilter = `{
        key: "price",
        compare: LESS_THAN_OR_EQUAL_TO,
        value: "${filters.maxPrice}",
        type: NUMERIC
      },`;
    }

    const responce = await fetch(`${process.env.WP_GRAPHQL_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // ВАЖЛИВО: Прибрали тег gql, тепер це просто string
        query: `
        query AllPropertiesQuery {
          properties(where: { 
            offsetPagination: { size: 3, offset: ${((filters.page || 1) - 1) * 3} }
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

    const result = await responce.json();
    
    // ВАЖЛИВО: У fetch відповідь лежить в result.data
    const data = result.data;

    if (!data?.properties?.nodes) {
      return NextResponse.json(
        { total: 0, properties: [] },
        { status: 200 }
      );
    }

    const propertiesWithFeatures = data.properties.nodes.map((prop) => {
      return prop;
    });

    return NextResponse.json(
      {
        total: data.properties.pageInfo.offsetPagination.total,
        properties: propertiesWithFeatures,
      },
      { status: 200 },
    );

  } catch (e) {
    console.log("ERROR: ", e);
    return NextResponse.json(
      { error: "Search failed", message: e.message },
      { status: 500 },
    );
  }
}