import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import {breakpoints, heading, colors, spacing} from '../utils/styles';

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

const Link2 = styled.a`
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

const Writings = () =>
    <Panel>
        <Title>{'Writings'}</Title>
        <ul>
            <Project>
                <Link href="/phpstorm-keyboard-shortcuts">
                    <Link2>
                        <ProjectName>{'Timesaving PhpStorm Keyboard Shortcuts to Increase Productivity'}</ProjectName>
                        <ProjectDescription>{'January 08, 2015'}</ProjectDescription>
                    </Link2>
                </Link>
            </Project>
            <Project>
                <Link href="/setup-phpstorm-xdebug-mamp-debugging">
                    <Link2>
                        <ProjectName>{'How To Setup and Configure PhpStorm, Xdebug, and MAMP for Debugging'}</ProjectName>
                        <ProjectDescription>{'January 06, 2015'}</ProjectDescription>
                    </Link2>
                </Link>
            </Project>
            <Project>
                <Link href={{pathname: '/post'}} as="/fix-wordpress-admin-styles-not-loading">
                    <Link2>
                        <ProjectName>{'How To Fix WordPress Admin Styles Not Loading'}</ProjectName>
                        <ProjectDescription>{'February 28, 2013'}</ProjectDescription>
                    </Link2>
                </Link>
            </Project>
        </ul>
    </Panel>;

export default Writings;
