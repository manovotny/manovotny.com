import React from 'react';
import styled from 'styled-components';

const StyledGravatar = styled.img`
    border-radius: 50%;
    height: 60px;
    vertical-align: middle;
    width: 60px;
`;

const Gravatar = () =>
    <StyledGravatar
        alt="Michael Novotny"
        src={'//www.gravatar.com/avatar/60cb31e323d15f1c0fc1a59ac17ba484?s=300'}
    />;

export default Gravatar;
