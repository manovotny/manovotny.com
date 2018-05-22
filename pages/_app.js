import React from 'react'
import App, {Container} from 'next/app'

import {global} from "../styles/mixins";

global();

export default class CustomApp extends App {
    render() {
        const {Component, pageProps} = this.props;

        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        );
    }
}
