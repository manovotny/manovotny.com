import {Component} from 'react';

import BoltIcon from "../icons/bolt.svg";
import Footer from "../components/footer";
import Header from "../components/post/header";
import Page from "../components/page";
import {title} from "../utils/site";
import {breakpoints, spacing, column, heading} from "../utils/styles";
import styled from "styled-components";

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


export default class Error extends Component {
    static getInitialProps({res, err}) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;

        return {statusCode}
    }

    render() {
        const {statusCode} = this.props;
        const errorTitle = statusCode === 404
            ? 'Not Found'
            : 'Error';
        const message = statusCode === 404
            ? 'Whatever it was you were looking for no longer exists.'
            : 'Something went terribly wrong.';

        return (
            <Page
                description="Not found."
                title={`${errorTitle} - ${title}`}
            >
                <Header />
                <Article>
                    <h3>
                        <BoltIcon/>
                        Oops!
                    </h3>
                    <p>{message}</p>
                    <p>Sorry about that!</p>
                </Article>
                <Footer />
            </Page>
        )
    }
}
