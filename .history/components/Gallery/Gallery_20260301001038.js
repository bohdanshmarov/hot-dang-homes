export const Gallery = ({ columns, cropImages, items }) => {
  return (
    <div class="flex flex-wrap max-w-5xl mx-auto">
			{items.map((item) => () => {
				const imageUrl = item.attributes.url;
				const altText = item.attributes.alt || "";
				const aspectRatio = item.attributes.width / item.attributes.height;
				const containerStyle = cropImages
					? { width: `${100 / columns}%`, height: "200px", overflow: "hidden" }
					: { width: `${100 / columns}%`, paddingBottom: `${100 / aspectRatio}%`, position: "relative" };
				const imageStyle = cropImages
					? { width: "100%", height: "100%", objectFit: "cover" }
					: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%" };
				return (
					<div key={item.id} style={containerStyle}>
						<img src={imageUrl} alt={altText} style={imageStyle} />
					</div>
				);
			}
     </div>
    />
  );
};
