"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageFallbackProps extends ImageProps {
  fallbackSrc: string;
}

const ImageFallback = (props: ImageFallbackProps) => {
  const { src, fallbackSrc, alt, ...rest } = props;
  
  // Basic validation to check if src is a potentially valid URL string
  // Basic validation to check if src is a potentially valid URL string
  const isValidUrl = (url: string): boolean => {
    return url.startsWith("http") || url.startsWith("/") || url.startsWith("data:");
  };

  // Use internal state for the image source to handle errors
  const [imgSrc, setImgSrc] = useState<string>(
    typeof src === "string" && isValidUrl(src) ? src : fallbackSrc,
  );

  // Properly handle prop changes without useEffect to avoid cascading renders
  const [prevSrc, setPrevSrc] = useState(src);
  if (src !== prevSrc) {
    setPrevSrc(src);
    setImgSrc(typeof src === "string" && isValidUrl(src) ? src : fallbackSrc);
  }

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt || ""}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageFallback;
