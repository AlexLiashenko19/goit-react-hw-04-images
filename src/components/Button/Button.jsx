import PropTypes from 'prop-types';
import { ButtonElem } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <ButtonElem onClick={onClick} type="button">
      Load more
    </ButtonElem>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
