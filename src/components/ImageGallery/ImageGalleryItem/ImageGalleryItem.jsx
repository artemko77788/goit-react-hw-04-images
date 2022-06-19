import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ item, toggle }) {
  const { webformatURL, tags, largeImageURL } = item;

  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.ImageGalleryItemimage}
        onClick={() => toggle([largeImageURL, tags])}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ImageGalleryItem;
