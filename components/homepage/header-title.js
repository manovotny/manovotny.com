import React from 'react';
import styled from 'styled-components';

import {heading} from '../../styles/mixins';
import {title} from '../../utils/site';

const StyledHeaderTitle = styled.h1`
    ${heading} font-size: 42px;
    margin-bottom: 15px;

    @media (min-width: 768px) {
        font-size: 50px;
    }
`;

const HeaderTitle = () => <StyledHeaderTitle>{title}</StyledHeaderTitle>;

export default HeaderTitle;
