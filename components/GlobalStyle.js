import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';

import {colors, spacing} from '../styles/vars';

const code = `
    background-color: #f3f3f3;
    border-radius: 2px;
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 16px;
    padding: 3px 6px;
`;

const GlobalStyle = createGlobalStyle`
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
        margin: ${spacing.large};
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
    
    @media (min-width: 768px) {
        body {
            font-size: 18px;
        }
    }
`;

export default GlobalStyle;
