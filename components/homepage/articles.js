import React from 'react';
import styled from 'styled-components';

import {spacing} from '../../styles/vars';

import ArticlesTitle from './articles-title';
import Article from './article';
import articles from "../../data/articles";

const StyledArticles = styled.section`
    padding: 0 ${spacing.small};
    margin-bottom: ${spacing.normal};
    vertical-align: top;
    
    @media (min-width: 768px) {
        display: inline-block;
        width: 49.5%;
    }
`;

const Articles = () =>
    <StyledArticles>
        <ArticlesTitle>{'Articles'}</ArticlesTitle>
        <ul>
            {articles.map((article) => (
                <Article
                    key={article.slug}
                    article={article}
                />
            ))}
        </ul>
    </StyledArticles>;

export default Articles;
