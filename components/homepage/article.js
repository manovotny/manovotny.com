import React from 'react';
import styled from 'styled-components';

import {spacing} from '../../styles/vars';
import Link from '../link';
import H4 from '../elements/h4';

import ArticleDate from './article-date';

const StyledArticle = styled.li`
    margin-bottom: ${spacing.normal};

    &:last-child {
        margin-bottom: 0;
    }
`;

const Article = ({article}) => (
    <StyledArticle>
        <Link slug={article.slug} underline={false}>
            <H4>{article.title}</H4>
            <ArticleDate>{article.date}</ArticleDate>
        </Link>
    </StyledArticle>
);

export default Article;
