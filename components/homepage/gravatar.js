import React from 'react';
import styled from 'styled-components';

const StyledGravatar = styled.img`
    border: #fff 5px solid;
    border-radius: 50%;
    height: 120px;
    width: 120px;
`;

const Gravatar = () =>
    <StyledGravatar
        alt="Michael Novotny"
        src={'//www.gravatar.com/avatar/60cb31e323d15f1c0fc1a59ac17ba484?s=300'}
    />;

export default Gravatar;
