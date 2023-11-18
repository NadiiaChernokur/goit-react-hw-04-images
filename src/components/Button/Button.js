import { ButtonLoadMore } from './Button.styled';

export const Button = ({ loadMore }) => {
  return (
    <ButtonLoadMore type="button" onClick={loadMore}>
      Load more
    </ButtonLoadMore>
  );
};
