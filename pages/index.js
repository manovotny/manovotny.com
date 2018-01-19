import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
    font-size: 100px;
    color: red;
`;

const Welcome = () =>
    <StyledTitle>{'Welcome to next.js!'}</StyledTitle>;

export default Welcome;
