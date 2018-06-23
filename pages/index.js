import React from 'react';
import styled from 'styled-components';

import Articles from '../components/homepage/articles';
import Header from '../components/homepage/header';
import Projects from '../components/homepage/projects';
import Footer from '../components/footer';
import Page from '../components/page';
import {column} from '../styles/mixins';
import {spacing} from '../styles/vars';

const Content = styled.main`
    ${column} color: #3a4145;
    margin-bottom: ${spacing.normal};
    padding: ${spacing.normal};
`;

const description =
    'JavaScript developer. Open source contributor. Insatiable learner. Standards and best practices enthusiast. Development is a lifestyle, not a job.';

const Index = () => (
    <Page description={description} title={`Michael Novotny - ${description}`}>
        <Header />
        <Content>
            <Projects />
            <Articles />
        </Content>
        <Footer />
    </Page>
);

export default Index;
