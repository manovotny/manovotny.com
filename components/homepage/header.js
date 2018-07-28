import React from 'react';
import styled from 'styled-components';

import {column, dividerBottom} from '../../styles/mixins';
import {spacing} from '../../styles/vars';

import HeaderBackground from './header-background';
import HeaderDescription from './header-description';
import HeaderTitle from './header-title';
import Avatar from './avatar';
import Social from './social';

const StyledHeader = styled.section`
    ${column}
    ${dividerBottom}
    margin: -60px auto ${spacing.normal};
    padding: 0 ${spacing.normal} ${spacing.small};
    position: relative;
    text-align: center;
`;

const Header = () => (
    <header>
        <HeaderBackground />
        <StyledHeader>
            <Avatar />
            <HeaderTitle />
            <HeaderDescription />
            <Social />
        </StyledHeader>
    </header>
);

export default Header;
