import {DateTime} from 'luxon';
import Link from "next/link";
import styled from 'styled-components';

import Gravatar from "../components/Gravatar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Questions from "../components/Questions";
import {title} from "../utils/site";
import {breakpoints, colors, column, dividerBottom, heading, spacing} from "../utils/styles";

const Header = styled.header`
    ${column}
    ${dividerBottom}
    
    background: transparent;
    height: auto;
    padding: ${spacing.normal};
    text-align: center;
`;

const Gravatar2 = styled(Gravatar)`
    border-width: 0;
    height: 60px;
    margin-bottom: 0;
    vertical-align: middle;
    width: 60px;
`;

const Title = styled.p`
    ${heading}
    display: inline-block;
    font-size: 24px;
    margin: 0 0 0 ${spacing.extrasmall};
    vertical-align: middle;
`;

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

const Post = ({url}) => {
    const filename = url.asPath.endsWith('/') ? url.asPath.slice(0, -1) : url.asPath;
    const markdown = require(`../posts${filename}.mdx`);
    const Markdown = markdown.default;
    const meta = markdown.meta;
    const dt = DateTime.fromISO(meta.date);
    const date = dt.toLocaleString(DateTime.DATE_FULL);
    const datetime = dt.toISO();

    return (
        <Layout
            description={meta.description}
            keywords={'KEYS'}
            title={`${meta.title} - ${title}`}
            url={url.asPath}
        >
            <Header>
                <Link href="/">
                    <a>
                        <Gravatar2 />
                        <Title>{title}</Title>
                    </a>
                </Link>
            </Header>
            <Article>
                <Markdown
                    date={date}
                    dateTime={datetime}
                    route={url.asPath}
                />
                <Questions />
            </Article>
            <Footer />
        </Layout>
    );
};

export default Post;
