import React from 'react';
import styled from 'styled-components';

import {spacing} from '../../styles/vars';

const StyledHeaderDescription = styled.h2`
    font-size: 18px;
    line-height: 1.5;
    margin: 0 0 ${spacing.normal};
`;

const HeaderDescription = () => (
    <StyledHeaderDescription>
        {'Director of Software Engineering at '}
        <a href="https://hy-vee.com">{'Hy-Vee'}</a>
        {
            '. Into open source, JavaScript, learning new things, and enabling others. Development is a lifestyle, not a job.'
        }
    </StyledHeaderDescription>
);

export default HeaderDescription;
