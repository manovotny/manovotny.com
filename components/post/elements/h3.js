import {spacing} from "../../../styles/vars";
import styled from "styled-components";
import {heading} from "../../../styles/mixins";

const H3 = styled.h3`
    ${heading}
    font-size: 20px;
    margin: ${spacing.normal} 0 ${spacing.small};
    
    @media (min-width: 768px) {
        font-size: 24px;
    }
`;

export default H3;
