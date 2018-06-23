import styled from 'styled-components';

import {spacing} from '../../styles/vars';

const Ol = styled.ol`
    margin-bottom: ${spacing.normal};
    list-style-type: decimal;

    p {
        margin-bottom: 0;
    }
`;

export default Ol;
