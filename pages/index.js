import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Profile from '../components/Profile';
import Projects from '../components/Projects';
import Writings from '../components/Writings';
import {description, title} from '../utils/site';
import {breakpoints, column, spacing} from '../utils/styles';

import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Content = styled.main`
    ${column}
    color: #3a4145;
    margin-bottom: ${spacing.normal};
    padding: ${spacing.normal};
    
    @media (min-width: ${breakpoints.ipad}) {
        font-size: 18px;
    }
`;

const Page = ({url}) =>
    <Layout
        description={description}
        title={`${title} - ${description}`}
        url={url.asPath}
    >
        <Hero/>
        <Profile />
        <Content>
            <Projects />
            <Writings />
        </Content>
        <Footer/>
    </Layout>;

export default Page;
