import { GalleryList } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import { UlElem } from './ImageGallery.styled';

export const Gallery = ({ images, modalOpen }) => {
  return (
    <UlElem className="gallery">
      {images.map(({ largeImageURL, id, tags }) => (
        <GalleryList
          key={id}
          tags={tags}
          largeImageURL={largeImageURL}
          modalOpen={modalOpen}
        />
      ))}
    </UlElem>
  );
};

Gallery.propTypes = {
  images: PropTypes.array.isRequired,
  modalOpen: PropTypes.func.isRequired,
};
