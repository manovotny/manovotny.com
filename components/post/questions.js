import React from 'react';
import styled from 'styled-components';

import {spacing} from '../../styles/vars';
import H2 from '../elements/h2';

const Section = styled.section`
    margin-bottom: ${spacing.large};
`;

const Questions = () => (
    <Section>
        <H2>{'Questions, Comments, or More?'}</H2>
        <p>
            {'Ask away on '}
            <a href="https://twitter.com/manovotny" title="Twitter">
                {'Twitter'}
            </a>
            {' or on my '}
            <a href="https://github.com/manovotny/ama" title="Ask Me Anything">
                {'GitHub AMA'}
            </a>
            {'!'}
        </p>
    </Section>
);

export default Questions;
