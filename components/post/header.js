import React from 'react';
import styled from 'styled-components';

import {dividerBottom} from '../../styles/mixins';
import {spacing} from '../../styles/vars';
import Link from '../link';

import Avatar from './avatar';
import HeaderTitle from './header-title';

const StyledHeader = styled.header`
    ${dividerBottom} margin: 0 auto;
    max-width: 768px;
    background: transparent;
    height: auto;
    padding: ${spacing.normal};
    text-align: center;
`;

const Header = () => (
    <StyledHeader>
        <Link>
            <Avatar />
            <HeaderTitle>{'Michael Novotny'}</HeaderTitle>
        </Link>
    </StyledHeader>
);

export default Header;
