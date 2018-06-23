import {title} from '../../utils/site';
import {heading} from '../../styles/mixins';
import {spacing} from '../../styles/vars';
import styled from 'styled-components';

const StyledHeaderTitle = styled.p`
    ${heading} display: inline-block;
    font-size: 24px;
    margin: 0 0 0 ${spacing.extrasmall};
    vertical-align: middle;
`;

const HeaderTitle = () => <StyledHeaderTitle>{title}</StyledHeaderTitle>;

export default HeaderTitle;
