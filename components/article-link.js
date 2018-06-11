import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const StyledArticleLink = styled.a`
    text-decoration: ${(props) => props.underline ? 'underline' : 'none'};
`;

const ArticleLink = (props) =>
    <Link
        as={`/${props.slug}`}
        href={{pathname: '/post'}}
        prefetch
    >
        <StyledArticleLink {...props}>{props.children}</StyledArticleLink>
    </Link>;

export default ArticleLink;
