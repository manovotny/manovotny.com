import React from 'react';
import styled from 'styled-components';

import Page from '../components/page';
import {description, title} from '../utils/site';
import {column, spacing} from '../utils/styles';

import Header from '../components/homepage/header';
import Articles from '../components/homepage/articles';
import Projects from '../components/homepage/projects';
import Footer from '../components/footer';

const Content = styled.main`
    ${column}
    color: #3a4145;
    margin-bottom: ${spacing.normal};
    padding: ${spacing.normal};
`;

const Index = () =>
    <Page
        description={description}
        title={`${title} - ${description}`}
    >
        <Header />
        <Content>
            <Projects />
            <Articles />
        </Content>
        <Footer/>
    </Page>;

export default Index;
