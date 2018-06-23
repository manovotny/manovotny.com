import React from 'react';
import styled from 'styled-components';

import {heading} from '../../styles/mixins';
import {spacing} from '../../styles/vars';
import {title} from '../../utils/site';

const StyledHeaderTitle = styled.p`
    ${heading} display: inline-block;
    font-size: 24px;
    margin: 0 0 0 ${spacing.extrasmall};
    vertical-align: middle;
`;

const HeaderTitle = () => <StyledHeaderTitle>{title}</StyledHeaderTitle>;

export default HeaderTitle;
