import React from 'react';
import styled from 'styled-components';

import AmaIcon from '../icons/ama.svg';
import GitHubIcon from '../icons/github.svg';
import TwitterIcon from '../icons/twitter.svg';

import {breakpoints, colors, dividerBottom, heading, listInline, listNoBullets, sizes, spacing} from '../utils/styles';
import {description, title} from '../utils/site';

const StyledNavigation = styled.nav`
    margin-bottom: ${spacing.normal};
`;

const StyledNavigationItems = styled.ul`
    ${listNoBullets}
    text-align: center;
    
    @media (min-width: ${breakpoints.iphoneplus}) {
        ${listInline()}
    }
`;

const StyledNavigationItem = styled.li`
    font-size: 16px;
    margin-bottom: ${spacing.normal};
    
    @media (min-width: ${breakpoints.iphoneplus}) {
        margin-bottom: 0;
    }
`;

const StyledNavigationLink= styled.a`
    color: ${colors.light};
    display: inline-block;
    text-decoration: none;
    
    svg {
        display: inline-block;
        height: ${sizes.icons};
        margin-right: ${spacing.extrasmall};
        vertical-align: middle;
        width: ${sizes.icons};
    }
`;

const Profile = () =>
    <StyledNavigation>
        <StyledNavigationItems>
            <StyledNavigationItem class="navigation-item">
                <StyledNavigationLink href="https://twitter.com/manovotny" title="Twitter">
                    <TwitterIcon/>
                    {'Twitter'}
                </StyledNavigationLink>
            </StyledNavigationItem>
            <StyledNavigationItem class="navigation-item">
                <StyledNavigationLink href="https://github.com/manovotny" title="GitHub">
                    <GitHubIcon/>
                    {'GitHub'}
                </StyledNavigationLink>
            </StyledNavigationItem>
            <StyledNavigationItem class="navigation-item">
                <StyledNavigationLink href="https://github.com/manovotny/ama" title="AMA">
                    <AmaIcon/>
                    {'AMA'}
                </StyledNavigationLink>
            </StyledNavigationItem>
        </StyledNavigationItems>
    </StyledNavigation>;

export default Profile;
