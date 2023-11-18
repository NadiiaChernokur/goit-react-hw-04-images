import {
  ImageGalleryItemImage,
  ImageGalleryItemLi,
} from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import { useEffect, useState } from 'react';

export const ImageGalleryItem = ({ id, smallPhoto, largePhoto }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        setModalIsOpen(false);
      }
    });
  }, []);

  const onShowModal = () => {
    setModalIsOpen(prevState => !prevState);
  };

  return (
    <ImageGalleryItemLi key={id} onClick={onShowModal}>
      <ImageGalleryItemImage src={smallPhoto} alt="" />

      {modalIsOpen && <Modal showModal={onShowModal} largePhoto={largePhoto} />}
    </ImageGalleryItemLi>
  );
};
