import React from 'react';
import styled from 'styled-components';

import {heading} from '../../styles/mixins';

const StyledProjectName = styled.h4`
    ${heading} font-size: 18px;
`;

const ProjectName = ({children}) => (
    <StyledProjectName>{children}</StyledProjectName>
);

export default ProjectName;
