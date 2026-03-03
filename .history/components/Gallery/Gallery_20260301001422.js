import Image from "next/image";

export const Gallery = ({ columns, cropImages, items }) => {
  const columnWidth = 100 / columns;

  return (
    <div className="flex flex-wrap max-w-5xl mx-auto">
      {items.map((item) => (
        <div
          className="p-5 flex-grow"
          key={item.id}
          style={{ width: `${columnWidth}%` }}
        >
          <Image
            src={item.attributes.url}
            width={item.attributes.width}
            height={item.attributes.height}
            alt={item.attributes.alternativeText}
          />
        </div>
      ))}
    </div>
  );
};
