import {DateTime} from 'luxon';
import React from 'react';
import styled from 'styled-components';

import {colors} from '../styles/vars';

const StyledDate = styled.time`
    color: ${colors.light};
    display: block;
    font-size: 14px;
    margin: 8px 0 24px;
    text-transform: uppercase;
`;

const Date = ({children}) => {
    const dt = DateTime.fromISO(children);
    const date = dt.toLocaleString(DateTime.DATE_FULL);
    const dateTime = dt.toISO();

    return <StyledDate dateTime={dateTime}>{date}</StyledDate>;
};

export default Date;
