import React from 'react';
import withGA from 'next-ga';
import App, {Container} from 'next/app';

import {global} from '../styles/mixins';

global();

class CustomApp extends App {
    render() {
        const {Component, pageProps} = this.props;

        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        );
    }
}

export default withGA('UA-27106984-1')(CustomApp);
