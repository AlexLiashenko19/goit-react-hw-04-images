import PropTypes from 'prop-types';

export const GalleryList = ({ tags, largeImageURL, modalOpen }) => {
  return (
    <li
      onClick={() => {
        const modalObj = { img: largeImageURL, tags: tags };
        modalOpen(modalObj);
      }}
    >
      <img src={largeImageURL} alt={tags} width="250px" />
    </li>
  );
};

GalleryList.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  modalOpen: PropTypes.func.isRequired,
};
