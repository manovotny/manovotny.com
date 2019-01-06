import React from 'react';
import styled from 'styled-components';

import {colors} from '../styles/vars';
import {dateTime, full} from '../utils/date-format';

const StyledDate = styled.time`
    color: ${colors.light};
    display: block;
    font-size: 14px;
    margin: 8px 0 24px;
`;

const Date = ({children}) => <StyledDate dateTime={dateTime(children)}>{full(children)}</StyledDate>;

export default Date;
