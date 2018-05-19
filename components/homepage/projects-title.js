import React from 'react';
import styled from 'styled-components';
import {heading, spacing} from "../../utils/styles";

const StyledProjectsTitle = styled.h3`
    ${heading}
    color: #2e2e2e;
    font-size: 24px;
    margin-bottom: ${spacing.normal};
`;

const ProjectsTitle = ({children}) =>
    <StyledProjectsTitle>{children}</StyledProjectsTitle>;

export default ProjectsTitle;
