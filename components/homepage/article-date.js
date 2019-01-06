import React from 'react';
import styled from 'styled-components';

import {colors} from '../../styles/vars';

const StyledArticleDate = styled.h4`
    color: ${colors.light};
    font-size: 14px;
    font-weight: lighter;
`;

const ArticleDate = ({children}) => <StyledArticleDate>{children}</StyledArticleDate>;

export default ArticleDate;
