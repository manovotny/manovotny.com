import React from 'react';
import styled from 'styled-components';

import {spacing} from '../styles/vars';

import Copyright from './copyright';

const StyledFooter = styled.footer`
    background-color: #fafafa;
    border-top: #eee 1px solid;
    flex-shrink: 0;
    padding-top: ${spacing.normal};
    text-align: center;
`;

const Footer = () => (
    <StyledFooter>
        <Copyright />
    </StyledFooter>
);

export default Footer;
