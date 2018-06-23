import React from 'react';
import styled from 'styled-components';

import {colors} from '../styles/vars';
import {title} from '../utils/site';

const StyledCopyright = styled.p`
    color: ${colors.light};
    display: inline-block;
    font-size: 0.8em;
`;

const Copyright = () => (
    <StyledCopyright
    >{`© Copyright 2010 - ${new Date().getFullYear()} ${title}`}</StyledCopyright>
);

export default Copyright;
