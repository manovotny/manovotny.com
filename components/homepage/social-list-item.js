import React from 'react';
import styled from 'styled-components';

import {breakpoints, spacing} from '../../utils/styles';

const SocialListItem = styled.li`
    font-size: 16px;
    margin-bottom: ${spacing.normal};
    
    @media (min-width: ${breakpoints.iphoneplus}) {
        margin-bottom: 0;
    }
`;

export default SocialListItem;
