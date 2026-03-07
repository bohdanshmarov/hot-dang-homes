import { PropertyCard } from "./PropertyCard";

export const Results = ({ properties = [] }) => {
  // log to help debug unexpected values during development
  if (process.env.NODE_ENV !== "production") {
    console.log("Results received properties:", properties);
  }

  // make absolutely sure we're iterating over an array
  const list = Array.isArray(properties) ? properties : [];

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-3 gap-5 mb-10">
      {list.map((property) => (
        <PropertyCard
          key={property.databaseId}
          title={property.title}
          destination={property.uri}
          bedrooms={property.propertyFeatures.bedrooms}
          bathrooms={property.propertyFeatures.bathrooms}
          price={property.propertyFeatures.price}
          hasParking={property.propertyFeatures.hasParking}
          petFriendly={property.propertyFeatures.petFriendly}
          image={property.featuredImage?.node?.sourceUrl}
        />
      ))}
    </div>
  );
};
