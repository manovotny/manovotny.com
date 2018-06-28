import Head from 'next/head';
import {withRouter} from 'next/router';
import React from 'react';

import {dateTime} from '../utils/date-format';
import titleStyle from '../utils/title-style';

const Page = ({
    children,
    date,
    description,
    image,
    title = 'Michael Novotny',
    keywords,
    router
}) => {
    const formattedTitle = titleStyle(title);
    const url = router && router.asPath ? router.asPath : undefined;
    const featuredImage = `https://manovotny.com${image}`;

    return (
        <>
            <Head>
                <title>{formattedTitle}</title>
                <meta charSet="utf-8" />
                <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
                <meta
                    content="width=device-width, initial-scale=1"
                    name="viewport"
                />
                {description && (
                    <meta content={description} name="description" />
                )}
                {keywords && <meta content={keywords} name="keywords" />}
                <meta content="follow, index" name="robots" />
                <meta content="#ffffff" name="theme-color" />
                <link
                    href="/apple-touch-icon.png"
                    rel="apple-touch-icon"
                    sizes="180x180"
                />
                <link
                    href="/favicon-32x32.png"
                    rel="icon"
                    sizes="32x32"
                    type="image/png"
                />
                <link
                    href="/favicon-16x16.png"
                    rel="icon"
                    sizes="16x16"
                    type="image/png"
                />
                <link href="/manifest.json" rel="manifest" />
                <link
                    color="#4a9885"
                    href="/safari-pinned-tab.svg"
                    rel="mask-icon"
                />
                <link href="/favicon.ico" rel="shortcut icon" />
                {url && <link href={url} rel="canonical" />}
                <meta content="en_US" property="og:locale" />
                <meta content={formattedTitle} property="og:title" />
                <meta content={description} property="og:description" />
                <meta content={url} property="og:url" />
                {featuredImage && (
                    <>
                        <meta content={featuredImage} property="og:image" />
                        <meta content={description} property="og:image:alt" />
                    </>
                )}
                {date && (
                    <>
                        <meta content="article" property="og:type" />
                        <meta
                            content={dateTime(date)}
                            property="article:published_time"
                        />
                    </>
                )}
                <meta content="summary_large_image" name="twitter:card" />
                <meta content="@manovotny" name="twitter:site" />
                <meta content="@manovotny" name="twitter:creator" />
            </Head>
            {children}
        </>
    );
};

export default withRouter(Page);
