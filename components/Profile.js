import React from 'react';
import styled from 'styled-components';

import {breakpoints, column, dividerBottom, heading, sizes, spacing} from '../utils/styles';
import {description, title} from '../utils/site';

import Gravatar from './Gravatar';
import Navigation from './Navigation';

const StyledSection = styled.section`
    ${column}
    ${dividerBottom}
    margin: calc(${sizes.gravatar} / 2 * -1) auto ${spacing.normal};
    padding: 0 ${spacing.normal} ${spacing.small};
    position: relative;
    text-align: center;
`;

const StyledTitle = styled.h1`
    ${heading}
    font-size: 42px;
    margin-bottom: 15px;
    
    @media (min-width: ${breakpoints.ipad}) {
        font-size: 50px;
    }
`;

const StyledDescription = styled.h2`
    font-size: 18px;
    line-height: 1.5;
    margin: 0 0 ${spacing.normal};
`;

const Profile = () =>
    <StyledSection>
        <Gravatar />
        <StyledTitle>{title}</StyledTitle>
        <StyledDescription>{description}</StyledDescription>
        <Navigation />
    </StyledSection>;

export default Profile;
