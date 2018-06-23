import styled from 'styled-components';
import {heading} from '../../styles/mixins';
import title from 'title';

const StyledH1 = styled.h1`
    ${heading} font-size: 32px;
    margin: 0;

    @media (min-width: 768px) {
        font-size: 48px;
    }
`;

const H1 = ({children}) => <StyledH1>{title(children)}</StyledH1>;

export default H1;
