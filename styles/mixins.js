import {colors} from './vars';

export const column = `
    flex: 1;
    margin: 0 auto;
    max-width: 768px;
    width: 100%;
`;

export const dividerBottom = `
    position: relative;
    width: 100%;
    border-bottom: 1px solid ${colors.border};

    &::after {
        background-color: #fff;
        border: 1px solid ${colors.border};
        border-radius: 100%;
        box-shadow: #fff 0 0 0 5px;
        content: '';
        display: block;
        height: 7px;
        left: 50%;
        margin-left: -5px;
        position: absolute;
        width: 7px;
        bottom: -4px;
    }
`;

export const heading = `
    color: #2e2e2e;
    font-weight: bold;
    line-height: 1.25;
    letter-spacing: -1px;
    text-rendering: geometricPrecision;
`;
