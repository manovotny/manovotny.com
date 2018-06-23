import styled from 'styled-components';
import title from 'title';
import {heading} from '../../styles/mixins';

const StyledH4 = styled.h4`
    ${heading} font-size: 18px;
`;

const H4 = ({children}) => <StyledH4>{title(children)}</StyledH4>;

export default H4;
