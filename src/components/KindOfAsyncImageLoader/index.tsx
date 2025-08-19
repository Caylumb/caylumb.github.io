import { useEffect, useState } from 'react';

interface KindOfAsyncImageLoaderProps {
  imageName: string;
  imageType: string;
  altText: string;
}

function KindOfAsyncImageLoader(props: KindOfAsyncImageLoaderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  console.log(props);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const url = await import(`../../assets/images/${props.imageName}.${props.imageType}?url`);
        setImageUrl(url.default);
      } catch (err) {
        console.warn(`Image file for ${props.imageName} not found: ${err}`);
        setError(true);
      }
    };
    loadImage();
  }, [props.imageName, props.imageType]);

  if (error) {
    return <span>Error loading image</span>;
  }

  if (!imageUrl) {
    return <span>Loading image...</span>;
  }

  return <img src={imageUrl} alt={props.altText} />;
}

export default KindOfAsyncImageLoader;
