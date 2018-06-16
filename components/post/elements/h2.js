import {spacing} from "../../../styles/vars";
import styled from "styled-components";
import {heading} from "../../../styles/mixins";

const H2 = styled.h2`
    ${heading}
    font-size: 24px;
    margin: ${spacing.large} 0 ${spacing.small};
    
    @media (min-width: 768px) {
        font-size: 36px;
    }
`;

export default H2;
