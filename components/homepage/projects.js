import React from 'react';
import styled from 'styled-components';

import projects from '../../data/projects';
import {spacing} from '../../styles/vars';

import Project from './project';
import ProjectsTitle from './projects-title';

const StyledProjects = styled.section`
    padding: 0 ${spacing.small};
    margin-bottom: ${spacing.normal};
    vertical-align: top;
    
    @media (min-width: 768px) {
        display: inline-block;
        width: 49.5%;
    }
`;

const Projects = () =>
    <StyledProjects>
        <ProjectsTitle>{'Projects'}</ProjectsTitle>
        <ul>
            {projects.map((project) => (
                <Project
                    key={project.name}
                    project={project}
                />
            ))}
        </ul>
    </StyledProjects>;

export default Projects;
