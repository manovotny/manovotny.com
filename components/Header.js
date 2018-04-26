import Link from "next/link";
import {title} from "../utils/site";
import Gravatar from "./Gravatar";
import {column, dividerBottom, heading, spacing} from "../utils/styles";
import styled from "styled-components";

const StyledHeader = styled.header`
    ${dividerBottom}
    
    margin: 0 auto;
    max-width: 768px;
    background: transparent;
    height: auto;
    padding: ${spacing.normal};
    text-align: center;
`;

const Gravatar2 = styled(Gravatar)`
    border-width: 0;
    height: 60px;
    margin-bottom: 0;
    vertical-align: middle;
    width: 60px;
`;

const Title = styled.p`
    ${heading}
    display: inline-block;
    font-size: 24px;
    margin: 0 0 0 ${spacing.extrasmall};
    vertical-align: middle;
`;

const Header = () =>
    <StyledHeader>
        <Link href="/">
            <a>
                <Gravatar2 />
                <Title>{title}</Title>
            </a>
        </Link>
    </StyledHeader>;

export default Header;
