import styled from 'styled-components';

import {spacing} from "../../styles/vars";

const Section = styled.section`
    margin-top: ${spacing.large};
`;

const Questions = () =>
    <Section>
        <h2>Questions?</h2>
        <p>Have a question about this post or anything else?</p>
        <p>Ask away on <a href="https://twitter.com/manovotny" title="Twitter">Twitter</a> or on my <a href="https://github.com/manovotny/ama" title="Ask Me Anything">GitHub AMA</a>!</p>
    </Section>;

export default Questions;
