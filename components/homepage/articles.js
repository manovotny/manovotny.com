import React from 'react';
import styled from 'styled-components';

import articles from '../../data/articles';
import {spacing} from '../../styles/vars';

import Article from './article';
import ArticlesTitle from './articles-title';

const StyledArticles = styled.section`
    padding: 0 ${spacing.small};
    margin-bottom: ${spacing.normal};
    vertical-align: top;

    @media (min-width: 768px) {
        display: inline-block;
        width: 49.5%;
    }
`;

const Articles = () => (
    <StyledArticles>
        <ArticlesTitle>{'Articles'}</ArticlesTitle>
        <ul>
            {articles.map((article) => (
                <Article article={article} key={article.slug} />
            ))}
        </ul>
    </StyledArticles>
);

export default Articles;
