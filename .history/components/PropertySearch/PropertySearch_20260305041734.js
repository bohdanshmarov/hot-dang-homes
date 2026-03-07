"use client";

import { useRouter, } from "next/router";
import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { Results } from "./Results";
import queryString from "query-string";
import { Filters } from "./Filters";

export const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 3;
  const router = useRouter();

  const search = async () => {
    const { page, minPrice, maxPrice, hasParking, petFriendly } =
      queryString.parse(window.location.search);
    const filters = {};
    if (minPrice) {
      filters.minPrice = parseInt(minPrice);
    }
    if (maxPrice) {
      filters.maxPrice = parseInt(maxPrice);
    }
    if (hasParking === "true") {
      filters.hasParking = true;
    }
    if (petFriendly === "true") {
      filters.petFriendly = true;
    }

    const response = await fetch(`/api/search`, {
      method: "POST",
      body: JSON.stringify({
        page: parseInt(page || "1"),
        ...filters,
      }),
    });
    const data = await response.json();
    console.log("SEARCH DATA: ", data);
    setProperties(data.properties);
    setTotalResults(data.total);
  };

  const handlePageClick = async (pageNumber) => {
    const { petFriendly, hasParking, minPrice, maxPrice } = queryString.parse(
      window.location.search,
    );

    // build query object only with defined values
    const qs = queryString.stringify(
      {
        page: pageNumber,
        petFriendly: petFriendly === "true" ? "true" : undefined,
        hasParking: hasParking === "true" ? "true" : undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(`${router.query.slug.join("/")}?${qs}`);
  };

  useEffect(() => {
    if (!router.isReady) return;
    search();
  }, [router.isReady, router.asPath]);

  const handleSearch = async ({
    petFriendly,
    hasParking,
    minPrice,
    maxPrice,
  }) => {
    // update our browser url
    // search
    console.log("FILTERS: ", petFriendly, hasParking, minPrice, maxPrice);
    const qs = queryString.stringify(
      {
        page: 1,
        petFriendly: petFriendly ? "true" : undefined,
        hasParking: hasParking ? "true" : undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(`${router.query.slug.join("/")}?${qs}`);
  };

  return (
    <div>
      <Filters onSearch={handleSearch} />
      <Results properties={properties} />
      <Pagination
        onPageClick={handlePageClick}
        totalPages={Math.ceil(totalResults / pageSize)}
      />
    </div>
  );
};
