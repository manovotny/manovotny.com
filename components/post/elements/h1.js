import styled from "styled-components";
import {heading} from "../../../styles/mixins";

const H1 = styled.h1`
    ${heading}
    font-size: 32px;
    margin: 0;
    
    @media (min-width: 768px) {
        font-size: 48px;
    }
`;

export default H1;
