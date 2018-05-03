import styled from 'styled-components';
import {withRouter} from 'next/router';

import Footer from "../components/Footer";
import Page from "../components/Page";
import Questions from "../components/Questions";
import Header from "../components/Header";
import {title} from "../utils/site";
import {breakpoints, colors, column, dividerBottom, heading, spacing} from "../utils/styles";

const Article = styled.article`
    ${column}
    padding: ${spacing.normal};
    
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
    
    @media (min-width: ${breakpoints.ipad}) {
        font-size: 18px;

        h1 {
            font-size: 50px;
        }

        h2 {
            font-size: 36px;
        }
    }
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
                <Markdown />
                <Questions />
            </Article>
            <Footer />
        </Page>
    );
};

export default withRouter(Post);
