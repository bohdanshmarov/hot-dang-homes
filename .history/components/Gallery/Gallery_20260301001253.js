export const Gallery = ({ columns, cropImages, items }) => {
  const columnWidth = 100 / columns;

  return (
    <div className="flex flex-wrap max-w-5xl mx-auto">
      {items.map((item) => (
        <div className="" key={item.id} style={{width: `${columnWidth}%`}}></div>
      ))}
    </div>
  );
};
