import React from 'react';
import styled from 'styled-components';

import AmaIcon from '../../icons/ama.svg';
import GitHubIcon from '../../icons/github.svg';
import TwitterIcon from '../../icons/twitter.svg';

import {spacing} from '../../utils/styles';

import SocialList from './social-list';
import SocialListItem from './social-list-item';
import SocialLink from './social-link';

const StyledSocial = styled.nav`
    margin-bottom: ${spacing.normal};
`;

const Social = () =>
    <StyledSocial>
        <SocialList>
            <SocialListItem>
                <SocialLink
                    href="https://twitter.com/manovotny"
                    title="Twitter"
                >
                    <TwitterIcon/>
                    {'Twitter'}
                </SocialLink>
            </SocialListItem>
            <SocialListItem>
                <SocialLink
                    href="https://github.com/manovotny"
                    title="GitHub"
                >
                    <GitHubIcon/>
                    {'GitHub'}
                </SocialLink>
            </SocialListItem>
            <SocialListItem>
                <SocialLink
                    href="https://github.com/manovotny/ama"
                    title="AMA"
                >
                    <AmaIcon/>
                    {'AMA'}
                </SocialLink>
            </SocialListItem>
        </SocialList>
    </StyledSocial>;

export default Social;
