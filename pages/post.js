import styled from 'styled-components';
import {withRouter} from 'next/router';

import Footer from "../components/footer";
import Page from "../components/page";
import Questions from "../components/post/questions";
import Header from "../components/post/header";
import {title} from "../utils/site";
import {column, dividerBottom, heading} from "../styles/mixins";
import {colors, spacing} from "../styles/vars";

import Blockquote from "../components/post/elements/blockquote";
import Em from "../components/post/elements/em";
import H1 from "../components/post/elements/h1";
import H2 from "../components/post/elements/h2";
import H3 from "../components/post/elements/h3";
import Img from "../components/post/elements/img";
import Li from "../components/post/elements/li";
import Ol from "../components/post/elements/ol";
import Strong from "../components/post/elements/strong";
import Ul from "../components/post/elements/ul";

const Article = styled.article`
    ${column}
    padding: ${spacing.normal};
    
    *:last-child {
        margin-bottom: 0;
    }
    
    @media (min-width: 768px) {
        font-size: 18px;
    }
`;

const MarkdownWrapper = styled.section`
    ${dividerBottom}
    padding-bottom: ${spacing.large};
`;

const removeTrailingSlashOnNextStaticSiteExports = (path) =>
    // https://github.com/zeit/next.js/pull/3283
    path.endsWith('/') ? path.slice(0, -1) : path;

const Post = ({router}) => {
    const path = removeTrailingSlashOnNextStaticSiteExports(router.asPath);
    const markdown = require(`../posts${path}.mdx`);
    const {meta} = markdown;
    const Markdown = markdown.default;

    return (
        <Page
            description={meta.description}
            title={`${meta.title} - ${title}`}
        >
            <Header />
            <Article>
                <MarkdownWrapper>
                    <Markdown
                        components={{
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
                        }}
                    />
                </MarkdownWrapper>
                <Questions />
            </Article>
            <Footer />
        </Page>
    );
};

export default withRouter(Post);
