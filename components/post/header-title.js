import React from 'react';
import styled from 'styled-components';

import {heading} from '../../styles/mixins';
import {spacing} from '../../styles/vars';

const StyledHeaderTitle = styled.p`
    ${heading} display: inline-block;
    font-size: 24px;
    margin: 0 0 0 ${spacing.extrasmall};
    vertical-align: middle;
`;

const HeaderTitle = () => (
    <StyledHeaderTitle>{'Michael Novotny'}</StyledHeaderTitle>
);

export default HeaderTitle;
