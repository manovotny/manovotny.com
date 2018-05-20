import React from 'react';
import styled from 'styled-components';

import AmaIcon from '../../icons/ama.svg';
import GitHubIcon from '../../icons/github.svg';
import TwitterIcon from '../../icons/twitter.svg';

import SocialListItem from './social-list-item';
import SocialLink from './social-link';

const Social = () =>
    <nav>
        <ul>
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
        </ul>
    </nav>;

export default Social;
