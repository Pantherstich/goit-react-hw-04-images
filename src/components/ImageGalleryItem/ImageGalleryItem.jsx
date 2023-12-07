import { ImgItem, ImgGalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item, onImageClick }) => {
  const handleClick = () => {
    onImageClick(item.largeImageURL, item.tags);
  };

  return (
    <ImgGalleryItem>
      <ImgItem src={item.webformatURL} alt={item.tags} onClick={handleClick} />
    </ImgGalleryItem>
  );
};
