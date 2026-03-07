import { PropertyCard } from "./PropertyCard";

export const Results = ({ properties }) => {
  // 1. Додаємо захисну перевірку: якщо properties немає, виводимо повідомлення або null
  if (!properties || properties.length === 0) {
    return <div className="max-w-5xl mx-auto mb-10 text-center">No properties found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-3 gap-5 mb-10">
      {/* 2. Використовуємо optional chaining (знак питання), щоб не було помилки undefined */}
      {properties?.map((property) => (
        <PropertyCard
          key={property.databaseId}
          title={property.title}
          destination={property.uri}
          // Додай також "?" тут, якщо раптом propertyFeatures прийде порожнім
          bedrooms={property.propertyFeatures?.bedrooms}
          bathrooms={property.propertyFeatures?.bathrooms}
          price={property.propertyFeatures?.price}
          hasParking={property.propertyFeatures?.hasParking}
          petFriendly={property.propertyFeatures?.petFriendly}
          image={property.featuredImage?.node?.sourceUrl}
        />
      ))}
    </div>
  );
};