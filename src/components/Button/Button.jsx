import { ButtonStyle } from 'components/Button/Button.styled';

export const Button = ({ onClick }) => {
  return (
    <ButtonStyle type="button" aria-label="Load more" onClick={onClick}>
      Load more
    </ButtonStyle>
  );
};
