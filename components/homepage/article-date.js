import React from 'react';
import styled from 'styled-components';

import {colors} from '../../utils/styles';

const StyledArticleDate = styled.h4`
    color: ${colors.light};
    font-size: 14px;
    font-weight: lighter;
    text-transform: uppercase;
`;

const ArticleDate = ({children}) =>
    <StyledArticleDate>{children}</StyledArticleDate>;

export default ArticleDate;
