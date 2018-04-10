import Document, {Head, Main, NextScript} from 'next/document';
import {injectGlobal, ServerStyleSheet} from 'styled-components';

import {global} from '../utils/styles';

export default class StyledComponentsDocument extends Document {
    static getInitialProps({renderPage}) {
        const sheet = new ServerStyleSheet();
        const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />));
        const styleTags = sheet.getStyleElement();

        injectGlobal`
            ${global}
        `;

        return {
            ...page,
            styleTags
        };
    }

    render() {
        return (
            <html lang="en">
                <Head>
                    {this.props.styleTags}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
