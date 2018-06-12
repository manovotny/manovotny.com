import styled from 'styled-components';
import {withRouter} from 'next/router';

import Footer from "../components/footer";
import Page from "../components/page";
import Questions from "../components/post/questions";
import Header from "../components/post/header";
import {title} from "../utils/site";
import {column, dividerBottom, heading} from "../styles/mixins";
import {colors, spacing} from "../styles/vars";

const Article = styled.article`
    ${column}
    padding: ${spacing.normal};
    
    blockquote {
        border-left: 4px solid #333;
        background-color: #f5f5f5;
        border-radius: 2px;
        padding: ${spacing.small} ${spacing.normal};
        font-style: italic;
        font-weight: bold;
        margin-bottom: ${spacing.normal};
        color: #333;
    }
    
    em {
        font-style: italic;
    }
    
    h1 {
        ${heading}
        font-size: 32px;
        margin: 0;
    }

    h2 {
        ${heading}
        font-size: 24px;
        margin: ${spacing.large} 0 ${spacing.small};
    }
    
    h3 {
        ${heading}
        font-size: 20px;
        margin: ${spacing.normal} 0 ${spacing.small};
    }

    img {
        display: block;
        margin: 0 auto ${spacing.normal};
        max-width: 100%;
    }

    time {
        color: ${colors.light};
        display: block;
        font-size: 14px;
        margin: 8px 0 24px;
        text-transform: uppercase;
    }
    
    ol,
    ul {
        margin-bottom: ${spacing.normal};
        
        p {
            margin-bottom: 0;
        }
    }
    
    ol {
        list-style-type: decimal;
        
    }
    
    ul {
        list-style-type: disc;
    }
    
    li {
        margin-left: ${spacing.normal};
    }
    
    *:last-child {
        margin-bottom: 0;
    }
    
    strong {
        font-weight: bold;
    }
    
    @media (min-width: 768px) {
        font-size: 18px;

        h1 {
            font-size: 48px;
        }

        h2 {
            font-size: 36px;
        }

        h3 {
            font-size: 24px;
        }
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
                    <Markdown />
                </MarkdownWrapper>
                <Questions />
            </Article>
            <Footer />
        </Page>
    );
};

export default withRouter(Post);
