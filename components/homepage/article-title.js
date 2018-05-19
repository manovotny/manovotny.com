import React from 'react';
import styled from 'styled-components';

import {heading} from '../../utils/styles';

const StyledArticleTitle = styled.h4`
    ${heading}
    font-size: 18px;
`;

const ArticleTitle = ({children}) =>
    <StyledArticleTitle>{children}</StyledArticleTitle>;

export default ArticleTitle;
