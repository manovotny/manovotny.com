import Head from 'next/head';
import {Fragment} from 'react';
import {withRouter} from 'next/router';

const Page = ({children, description, title = 'Michael Novotny', keywords, router, searchEngines}) => {
    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8"/>
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
                <meta name="theme-color" content="#ffffff"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32"/>
                <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16"/>
                <link rel="manifest" href="/manifest.json"/>
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#4a9885"/>
                <link rel="shortcut icon" href="/favicon.ico"/>
                {router && router.asPath &&
                    <link rel="canonical" href={router.asPath}/>
                }
            </Head>
            {children}
        </Fragment>
    );
};

export default withRouter(Page);