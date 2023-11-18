import { ModalImage, Overlay } from './Modal.styled';

export const Modal = ({ showModal, largePhoto }) => {
  return (
    <Overlay>
      <ModalImage onClick={showModal}>
        <img src={largePhoto} alt="" />
      </ModalImage>
    </Overlay>
  );
};
