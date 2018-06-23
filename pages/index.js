import React from 'react';
import styled from 'styled-components';

import Articles from '../components/homepage/articles';
import Header from '../components/homepage/header';
import Projects from '../components/homepage/projects';
import Footer from '../components/footer';
import Page from '../components/page';
import {column} from '../styles/mixins';
import {spacing} from '../styles/vars';
import {description, title} from '../utils/site';

const Content = styled.main`
    ${column} color: #3a4145;
    margin-bottom: ${spacing.normal};
    padding: ${spacing.normal};
`;

const Index = () => (
    <Page description={description} title={`${title} - ${description}`}>
        <Header />
        <Content>
            <Projects />
            <Articles />
        </Content>
        <Footer />
    </Page>
);

export default Index;
