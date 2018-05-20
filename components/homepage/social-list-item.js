import React from 'react';
import styled from 'styled-components';

import {spacing} from '../../utils/styles';

const SocialListItem = styled.li`
    display: block;
    margin-bottom: ${spacing.normal};
    
    @media (min-width: 376px) {
        display: inline-block;
        margin-right: ${spacing.large};
        
        &:last-child {
            margin-right: 0;
        }        
    }
`;

export default SocialListItem;
