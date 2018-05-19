import React, {Fragment} from 'react';
import styled from 'styled-components';

import {column, dividerBottom, spacing} from '../../utils/styles';

import HeaderBackground from './header-background';
import HeaderDescription from './header-description';
import HeaderTitle from './header-title';
import Gravatar from './gravatar';
import Social from './social';

const StyledHeader = styled.section`
    ${column}
    ${dividerBottom}
    margin: -60px auto ${spacing.normal};
    padding: 0 ${spacing.normal} ${spacing.small};
    position: relative;
    text-align: center;
`;

const Header = () =>
    <Fragment>
        <HeaderBackground/>
        <StyledHeader>
            <Gravatar />
            <HeaderTitle/>
            <HeaderDescription/>
            <Social />
        </StyledHeader>
    </Fragment>;

export default Header;
