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
        {
            'JavaScript developer. Open source contributor. Insatiable learner. Standards and best practices enthusiast. Development is a lifestyle, not a job.'
        }
    </StyledHeaderDescription>
);

export default HeaderDescription;
