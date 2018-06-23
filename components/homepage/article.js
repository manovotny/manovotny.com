import React from 'react';
import styled from 'styled-components';

import {spacing} from '../../styles/vars';

import ArticleDate from './article-date';
import ArticleLink from '../article-link';
import H4 from '../elements/h4';

const StyledArticle = styled.li`
    margin-bottom: ${spacing.normal};

    &:last-child {
        margin-bottom: 0;
    }
`;

const Article = ({article}) => (
    <StyledArticle>
        <ArticleLink slug={article.slug} underline={false}>
            <H4>{article.title}</H4>
            <ArticleDate>{article.date}</ArticleDate>
        </ArticleLink>
    </StyledArticle>
);

export default Article;
