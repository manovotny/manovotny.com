import Link from "next/link";
import {title} from "../../utils/site";
import Gravatar from "./gravatar";
import {dividerBottom} from "../../styles/mixins";
import {spacing} from "../../styles/vars";
import styled from "styled-components";

import HeaderTitle from './header-title';

const StyledHeader = styled.header`
    ${dividerBottom}
    
    margin: 0 auto;
    max-width: 768px;
    background: transparent;
    height: auto;
    padding: ${spacing.normal};
    text-align: center;
`;

const Header = () =>
    <StyledHeader>
        <Link
            href="/"
            prefetch
        >
            <a>
                <Gravatar />
                <HeaderTitle>{title}</HeaderTitle>
            </a>
        </Link>
    </StyledHeader>;

export default Header;
