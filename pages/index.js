import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Profile from '../components/Profile';
import Projects from '../components/Projects';
import Writings from '../components/Writings';
import {description, title} from '../utils/site';
import {breakpoints, column, spacing} from '../utils/styles';

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
        description={'Are your WordPress admin styles not loading? This post will guide you through a fix so they start loading again.'}
        keywords={'KEYS'}
        title={`How To Fix WordPress Admin Styles Not Loading - ${title}`}
        url={url}
    >
        <Profile />
        <Content>
            <Projects />
            <Writings />
        </Content>
    </Layout>;

export default Page;
