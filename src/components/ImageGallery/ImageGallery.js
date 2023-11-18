import { ImageGalleryItem } from '../ImegeGalleryItem/ImageGalleryItem';
import { GalleryUl } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <GalleryUl>
      {images.map(image => {
        return (
          <ImageGalleryItem
            id={image.id}
            smallPhoto={image.webformatURL}
            largePhoto={image.largeImageURL}
          />
        );
      })}
    </GalleryUl>
  );
};
