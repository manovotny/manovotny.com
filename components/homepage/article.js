import React from 'react';
import styled from 'styled-components';

import {spacing} from '../../utils/styles';

import ArticleDate from './article-date';
import ArticleTitle from './article-title';
import ArticleLink from './article-link';

const StyledArticle = styled.li`
    margin-bottom: ${spacing.normal};
    
    &:last-child {
        margin-bottom: 0;    
    }
`;

const Article = ({article}) =>
    <StyledArticle>
        <ArticleLink slug={article.slug}>
            <ArticleTitle>{article.title}</ArticleTitle>
            <ArticleDate>{article.date}</ArticleDate>
        </ArticleLink>
    </StyledArticle>;

export default Article;
