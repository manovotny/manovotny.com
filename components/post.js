import styled from 'styled-components';
import {MDXProvider} from '@mdx-js/tag';

import Footer from '../components/footer';
import Page from '../components/page';
import Questions from './post/questions';
import Header from './post/header';
import {title} from '../utils/site';
import {column, dividerBottom} from '../styles/mixins';
import {spacing} from '../styles/vars';

import Blockquote from './elements/blockquote';
import Em from './elements/em';
import H1 from './elements/h1';
import H2 from './elements/h2';
import H3 from './elements/h3';
import Img from './elements/img';
import Li from './elements/li';
import Ol from './elements/ol';
import Strong from './elements/strong';
import Ul from './elements/ul';

const components = {
    blockquote: Blockquote,
    em: Em,
    h1: H1,
    h2: H2,
    h3: H3,
    img: Img,
    li: Li,
    ol: Ol,
    strong: Strong,
    ul: Ul
};

const Article = styled.article`
    ${column}
    padding: ${spacing.normal};
    
    @media (min-width: 768px) {
        font-size: 18px;
    }
`;

const MarkdownWrapper = styled.section`
    ${dividerBottom}
    padding-bottom: ${spacing.large};
`;

const Post = ({children, meta}) => (
    <Page description={meta.description} title={`${meta.title} - ${title}`}>
        <Header />
        <Article>
            <MDXProvider components={components}>
                <MarkdownWrapper>{children}</MarkdownWrapper>
            </MDXProvider>
            <Questions />
        </Article>
        <Footer />
    </Page>
);

export default Post;
