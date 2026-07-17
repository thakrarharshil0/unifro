import Image from "next/image";

const ImageGrid = ({ images, onImageClick }) => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {images?.map((img, index) => (
        <div
          key={img.id || index}
          className="break-inside-avoid cursor-pointer"
          onClick={() => onImageClick(index)}
        >
          <Image
            src={img.imgSrc}
            alt={img.title || "Gallery image"}
            width={500}
            height={500}
            className="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;