import {spacing} from "../../../styles/vars";
import styled from "styled-components";

const Blockquote = styled.blockquote`
    border-left: 4px solid #333;
    background-color: #f5f5f5;
    border-radius: 2px;
    padding: ${spacing.small} ${spacing.normal};
    font-style: italic;
    font-weight: bold;
    margin-bottom: ${spacing.normal};
    color: #333;
`;

export default Blockquote;
