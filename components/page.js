import Head from 'next/head';
import {withRouter} from 'next/router';
import React from 'react';

import titleStyle from '../utils/title-style';

const Page = ({
    children,
    description,
    title = 'Michael Novotny',
    keywords,
    router,
    searchEngines
}) => {
    return (
        <>
            <Head>
                <title>{titleStyle(title)}</title>
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
                <meta
                    content={`${
                        process.env.production && searchEngines
                            ? 'follow, index'
                            : 'nofollow, noindex'
                    }`}
                    name="robots"
                />
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
                {router &&
                    router.asPath && (
                        <link href={router.asPath} rel="canonical" />
                    )}
            </Head>
            {children}
        </>
    );
};

export default withRouter(Page);
