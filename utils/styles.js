import {injectGlobal} from 'styled-components';
import reset from 'styled-reset';

export const breakpoints = {
    iphoneplus: '414px',
    ipad: '768px'
};

export const colors = {
    border: '#eee',
    background: '#0a6159',
    light: '#9eabb3',
    text: '#50585d'
};

export const column = `
    flex: 1;
    margin: 0 auto;
    max-width: 768px;
    width: 100%;
`;

export const fonts = {
    merriweather: 'Merriweather, serif',
    opensans: '\'Open Sans\', sans-serif'
};

export const sizes = {
    gravatar: '120px',
    header: '150px',
    icons: '24px'
};

export const spacing = {
    extrasmall: '8px',
    small: '12px',
    normal: '24px',
    large: '48px',
    extralarge: '72px'
};

export const code = `
    background-color: #f3f3f3;
    border-radius: 2px;
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 16px;
    padding: 3px 6px;
`;

export const global = () => injectGlobal`
    ${reset}

    html {
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
        min-width: 320px;

        *,
        *::before,
        *::after {
            box-sizing: inherit;
        }
    }

    body {
        background-color: #fff;
        color: ${colors.text};
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        line-height: 1.75;
        text-rendering: optimizeLegibility;
    }

    a {
        color: ${colors.text};
        cursor: pointer;
    }

    p {
        margin: 0 0 ${spacing.normal};
    }

    code {
        ${code}
    }

    kbd {
        ${code}
        background-color: #333;
        color: #fff;
        font-weight: bold;
    }

    pre {
        ${code}
        line-height: 1.4em;
        margin: 0 0 ${spacing.normal};
        overflow-x: auto;
        padding: ${spacing.normal};
        white-space: pre;

        code {
            padding: 0;
        }
    }

    hr {
        border: 0;
        margin: ${spacing.normal} 0 ${spacing.large};
        text-align: center;

        &::before {
            content: '...';
            display: inline-block;
            letter-spacing: 1em;
            line-height: 1;
        }
    }
    
    #__next {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    
    @media (min-width: ${breakpoints.ipad}) {
        body {
            font-size: 18px;
        }
    }
`;

export const clearfix = `
    &::after {
        clear: both;
        content: '';
        display: table;
    }
`;

export const divider = `
    position: relative;
    width: 100%;
`;

export const dividerDot = `
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
`;

export const dividerBottom = `
    ${divider}
    border-bottom: 1px solid ${colors.border};

    &::after {
        ${dividerDot}
        bottom: -4px;
    }
`;

export const dividerTop = `
    ${divider}
    border-top: 1px solid ${colors.border};

    &::before {
        ${dividerDot}
        top: -4px;
    }
`;

export const listNoBullets = `
    list-style: none;
    margin: 0;
    padding: 0;
`;

export const listInline = (space = spacing.large) => `
    ${listNoBullets}

    li {
        display: inline-block;
        margin-right: ${space};

    &:last-child {
        margin-right: 0;
    }
`;

export const heading = `
    color: #2e2e2e;
    font-weight: bold;
    line-height: 1.25;
    letter-spacing: -1px;
    text-rendering: geometricPrecision;
`;
