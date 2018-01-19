import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
    color: #f00;
    font-size: 100px;
`;

const Welcome = () =>
    <StyledTitle>{'Welcome to next.js!'}</StyledTitle>;

export default Welcome;
