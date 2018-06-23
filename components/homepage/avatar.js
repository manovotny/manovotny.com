import React from 'react';
import styled from 'styled-components';

const StyledAvatar = styled.img`
    border: #fff 5px solid;
    border-radius: 50%;
    height: 120px;
    width: 120px;
`;

const Avatar = () => (
    <StyledAvatar alt="Michael Novotny" src={'/images/avatar.jpg'} />
);

export default Avatar;
