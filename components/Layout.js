import Head from 'next/head';
import {Fragment} from 'react';

import Header from './Header';
import Footer from './Footer';

const Layout = ({children, description, title = 'Michael Novotny', keywords, searchEngines}) =>
    <Fragment>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta
                content="IE=edge"
                httpEquiv="X-UA-Compatible"
            />
            <meta
                content="width=device-width, initial-scale=1"
                name="viewport"
            />
            {description &&
                <meta
                    content={description}
                    name="description"
                />
            }
            {keywords &&
                <meta
                    content={keywords}
                    name="keywords"
                />
            }
            <meta
                content={`${process.env.production && searchEngines ? 'follow, index' : 'nofollow, noindex'}`}
                name="robots"
            />
            <meta name="theme-color" content="#ffffff" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
            <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#4a9885" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" />
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Merriweather:300,700,700italic,300italic|Open+Sans:700,400" />
        </Head>
        <Header />
        {children}
        <Footer />
    </Fragment>;

export default Layout;
