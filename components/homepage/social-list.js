import React from 'react';
import styled from 'styled-components';

import {breakpoints, listInline} from '../../utils/styles';

const SocialList = styled.ul`
    text-align: center;
    
    @media (min-width: ${breakpoints.iphoneplus}) {
        ${listInline}
    }
`;

export default SocialList;
