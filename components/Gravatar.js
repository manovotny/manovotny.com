import React from 'react';
import styled from 'styled-components';

import {sizes} from '../utils/styles';
import {gravatar} from '../utils/site';

const StyledImage = styled.img`
    border: #fff 5px solid;
    border-radius: 50%;
    height: ${sizes.gravatar};
    width: ${sizes.gravatar};
`;

const Gravatar = ({className}) =>
    <StyledImage
        className={className}
        alt="Michael Novotny"
        src={`${gravatar}?s=300`}
    />;

export default Gravatar;
