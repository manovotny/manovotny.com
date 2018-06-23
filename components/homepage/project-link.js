import React from 'react';
import styled from 'styled-components';

const StlyedProjectLink = styled.a`
    text-decoration: none;
`;

const ProjectLink = ({children, href}) => (
    <StlyedProjectLink href={href}>{children}</StlyedProjectLink>
);

export default ProjectLink;
