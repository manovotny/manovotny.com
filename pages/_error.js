import React, {Component} from 'react';
import styled from 'styled-components';

import Footer from '../components/footer';
import Page from '../components/page';
import Header from '../components/post/header';
import BoltIcon from '../icons/bolt.svg';
import {column, heading} from '../styles/mixins';
import {spacing} from '../styles/vars';
import {title} from '../utils/site';

const Article = styled.article`
    ${column}
    padding: ${spacing.normal};
    
    h3 {
        ${heading}
        margin: 8px 0 12px;
        font-size: 32px;
    }
    
    svg {
        display: inline-block;
        height: 32px;
        vertical-align: middle;
        width: 32px;
    }
`;

const getStatusCode = (res, err) => {
    if (res) {
        return res.statusCode;
    } else if (err) {
        return err.statusCode;
    }

    return null;
};

export default class Error extends Component {
    static getInitialProps({res, err}) {
        const statusCode = getStatusCode(res, err);

        return {statusCode};
    }

    render() {
        const {statusCode} = this.props;
        const errorTitle = statusCode === 404 ? 'Not Found' : 'Error';
        const message =
            statusCode === 404
                ? 'Whatever it was you were looking for no longer exists.'
                : 'Something went terribly wrong.';

        return (
            <Page description="Not found." title={`${errorTitle} - ${title}`}>
                <Header />
                <Article>
                    <h3>
                        <BoltIcon />
                        {'Oops!'}
                    </h3>
                    <p>{message}</p>
                    <p>{'Sorry about that!'}</p>
                </Article>
                <Footer />
            </Page>
        );
    }
}
