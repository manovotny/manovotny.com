import {spacing} from "../../../styles/vars";
import styled from "styled-components";

const Ol = styled.ol`
    margin-bottom: ${spacing.normal};
    list-style-type: decimal;
    
    p {
        margin-bottom: 0;
    }
`;

export default Ol;
