import React from 'react';
import styled from 'styled-components';

import {breakpoints, sizes} from '../utils/styles';

const StyledHeader = styled.header`
    background: linear-gradient(to left, #67b26f, #4ca2cd);
    height: ${sizes.header};
    text-align: center;
    
    @media (min-width: ${breakpoints.ipad}) {
        height: calc(${sizes.header} * 2);
    }
`;

const Header = () =>
    <StyledHeader />;

export default Header;