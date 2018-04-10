import React from 'react';
import styled from 'styled-components';

import {copyrightStartDate, title} from '../utils/site';
import {colors, spacing} from '../utils/styles';

const StyledFooter = styled.footer`
    background-color: #fafafa;
    border-top: #eee 1px solid;
    bottom: 0;
    left: 0;
    padding-top: ${spacing.normal};
    position: absolute;
    right: 0;
    text-align: center;
`;

const StyledCopyright = styled.p`
    color: ${colors.light};
    display: inline-block;
    font-size: .8em;
`;

const Footer = () =>
    <StyledFooter>
        <StyledCopyright>{`© Copyright ${copyrightStartDate} - ${(new Date()).getFullYear()} ${title}`}</StyledCopyright>
    </StyledFooter>;

export default Footer;
