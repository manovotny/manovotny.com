import React from 'react';
import styled from 'styled-components';

const StyledHeaderBackground = styled.header`
    background: linear-gradient(to left, #67b26f, #4ca2cd);
    height: 150px;
    text-align: center;

    @media (min-width: 768px) {
        height: 300px;
    }
`;

const HeaderBackground = () => <StyledHeaderBackground />;

export default HeaderBackground;
