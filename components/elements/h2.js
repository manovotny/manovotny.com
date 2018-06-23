import React from 'react';
import styled from 'styled-components';

import {heading} from '../../styles/mixins';
import {spacing} from '../../styles/vars';
import titleStyle from '../../utils/title-style';

const StyledH2 = styled.h2`
    ${heading} font-size: 24px;
    margin: ${spacing.large} 0 ${spacing.small};

    @media (min-width: 768px) {
        font-size: 36px;
    }
`;

const H2 = ({children}) => <StyledH2>{titleStyle(children)}</StyledH2>;

export default H2;
