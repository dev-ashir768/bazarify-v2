"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

interface ImageFallbackProps extends ImageProps {
  fallbackSrc: string;
}

const ImageFallback = (props: ImageFallbackProps) => {
  const { src, fallbackSrc, alt, ...rest } = props;
  
  // Basic validation to check if src is a potentially valid URL string
  const isValidUrl = (url: any): boolean => {
    if (typeof url !== 'string') return false;
    return url.startsWith('http') || url.startsWith('/') || url.startsWith('data:');
  };

  const [imgSrc, setImgSrc] = useState<any>(isValidUrl(src) ? src : fallbackSrc);

  // Synchronize internal state when the src prop changes
  useEffect(() => {
    setImgSrc(isValidUrl(src) ? src : fallbackSrc);
  }, [src, fallbackSrc]);

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
