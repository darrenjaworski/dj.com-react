import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { Heading } from '../components/heading';

const StyledImage = styled.img`
  width: 100%;
  background: ${(props) => props.theme.color};
`;

const FourOhFour = (props) => {
  const { image } = props;
  return (
    <>
      <Heading>
        Human sacrifice, dogs and cats living together... mass hysteria!
      </Heading>
      <StyledImage src={image} alt="Bill Murray." />
    </>
  );
};

FourOhFour.propTypes = {
  image: PropTypes.string,
};

FourOhFour.defaultProps = {
  image: 'https://www.fillmurray.com/g/400/400',
};

export default FourOhFour;
