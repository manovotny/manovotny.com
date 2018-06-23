import {spacing} from '../../styles/vars';
import styled from 'styled-components';
import {heading} from '../../styles/mixins';
import title from 'title';

const StyledH3 = styled.h3`
    ${heading} font-size: 20px;
    margin: ${spacing.normal} 0 ${spacing.small};

    @media (min-width: 768px) {
        font-size: 24px;
    }
`;

const H3 = ({children}) => <StyledH3>{title(children)}</StyledH3>;

export default H3;
