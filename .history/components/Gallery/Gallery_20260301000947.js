export const Gallery = ({ columns, cropImages, items }) => {
  return (
    <div
      className={`max-w-5xl mx-auto columns-${columns} ${cropImages ? "crop-images" : ""}`}
    />
  );
};
