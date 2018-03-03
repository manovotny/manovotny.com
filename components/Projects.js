import React from 'react';
import styled from 'styled-components';

import {breakpoints, colors, heading, spacing} from '../utils/styles';

const Panel = styled.section`
    padding: 0 ${spacing.small};
    margin-bottom: ${spacing.normal};
    vertical-align: top;
    
    @media (min-width: ${breakpoints.ipad}) {
        display: inline-block;
        width: 49.5%;
    }
`;

const Title = styled.h3`
    ${heading}
    color: #2e2e2e;
    font-size: 24px;
    margin-bottom: ${spacing.normal};
`;

const Project = styled.li`
    margin-bottom: ${spacing.normal};
    
    &:last-child {
        margin-bottom: 0;    
    }
`;

const Link = styled.a`
    text-decoration: none;
`;

const ProjectName = styled.h4`
    ${heading}
    font-size: 18px;
`;

const ProjectDescription = styled.h4`
    color: ${colors.light};
    font-size: 14px;
    font-weight: lighter;
    text-transform: uppercase;
`;

const Projects = () =>
    <Panel>
        <Title>Projects</Title>
        <ul>
            <Project>
                <Link href="https://www.npmjs.com/package/eslint-config-get-off-my-lawn">
                    <ProjectName>{'eslint-config-get-off-my-lawn'}</ProjectName>
                    <ProjectDescription>{'A highly opinionated, sharable config of ESLint rules to produce beautiful, readable JavaScript.'}</ProjectDescription>
                </Link>
            </Project>
            <Project>
                <Link href="https://www.npmjs.com/package/stylelint-config-get-off-my-lawn">
                    <ProjectName>{'stylelint-config-get-off-my-lawn'}</ProjectName>
                    <ProjectDescription>{'A highly opinionated, sharable config of stylelint rules to produce beautiful, readable CSS and Sass.'}</ProjectDescription>
                </Link>
            </Project>
        </ul>
    </Panel>;

export default Projects;
