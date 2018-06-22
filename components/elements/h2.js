import {spacing} from "../../styles/vars";
import styled from "styled-components";
import {heading} from "../../styles/mixins";
import title from "title";

const StyledH2 = styled.h2`
    ${heading}
    font-size: 24px;
    margin: ${spacing.large} 0 ${spacing.small};
    
    @media (min-width: 768px) {
        font-size: 36px;
    }
`;

const H2 = ({children}) =>
    <StyledH2>{title(children)}</StyledH2>;

export default H2;
