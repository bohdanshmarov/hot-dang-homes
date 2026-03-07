"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Pagination } from "./Pagination";
import { Results } from "./Results";
import queryString from "query-string";
import { Filters } from "./Filters";

export const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 3;
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const search = useCallback(async () => {
    // Беремо параметри прямо з URL
    const params = queryString.parse(window.location.search);
    
    const filters = {};
    if (params.minPrice) filters.minPrice = parseInt(params.minPrice);
    if (params.maxPrice) filters.maxPrice = parseInt(params.maxPrice);
    if (params.hasParking === "true") filters.hasParking = true;
    if (params.petFriendly === "true") filters.petFriendly = true;

    const response = await fetch(`/api/search`, {
      method: "POST",
      body: JSON.stringify({
        page: parseInt(params.page || "1"),
        ...filters,
      }),
    });

    const data = await response.json();
    setProperties(data.properties || []);
    setTotalResults(data.total || 0);
  }, []);

  // Викликаємо пошук щоразу, коли змінюється URL
  useEffect(() => {
    search();
  }, [searchParams, search]);

  const handleSearch = async ({ petFriendly, hasParking, minPrice, maxPrice }) => {
    const qs = queryString.stringify(
      {
        page: 1,
        petFriendly: petFriendly ? "true" : undefined,
        hasParking: hasParking ? "true" : undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(`${pathName}?${qs}`);
  };

  const handlePageClick = async (pageNumber) => {
    const params = queryString.parse(window.location.search);
    const qs = queryString.stringify({
      ...params,
      page: pageNumber,
    });
    router.push(`${pathName}?${qs}`);
  };

  return (
    <div>
      {/* ПЕРЕДАЄМО ПАРАМЕТРИ З URL У ФІЛЬТРИ */}
      <Filters 
        onSearch={handleSearch} 
        initialFilters={{
          minPrice: searchParams.get("minPrice"),
          maxPrice: searchParams.get("maxPrice"),
          hasParking: searchParams.get("hasParking") === "true",
          petFriendly: searchParams.get("petFriendly") === "true",
        }}
      />
      <Results properties={properties} />
      <Pagination
        onPageClick={handlePageClick}
        totalPages={Math.ceil(totalResults / pageSize)}
      />
    </div>
  );
};