import React from 'react';
import styled from 'styled-components';

import {spacing} from '../../styles/vars';
import {description} from '../../utils/site';

const StyledHeaderDescription = styled.h2`
    font-size: 18px;
    line-height: 1.5;
    margin: 0 0 ${spacing.normal};
`;

const HeaderDescription = () =>
    <StyledHeaderDescription>{description}</StyledHeaderDescription>;

export default HeaderDescription;
