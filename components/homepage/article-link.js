import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const StyledArtcileLink = styled.a`
    text-decoration: none;
`;

const ArticleLink = ({children, slug}) =>
    <Link href={{pathname: '/post'}} as={`/${slug}`}>
        <StyledArtcileLink>{children}</StyledArtcileLink>
    </Link>;

export default ArticleLink;
