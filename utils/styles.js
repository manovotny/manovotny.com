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

export const global = `
    ${reset}
            
    html {
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
        line-height: 1.25;
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
        //font-family: fonts(merriweather);
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        line-height: 1.75;
        text-rendering: optimizeLegibility;
    }
    
    a {
        color: ${colors.text};
    }
    
    p {
        margin: 0 0 ${spacing.normal};
    }
    
    code {
        @include code;
    }
    
    kbd {
        @include code;
        background-color: #333;
        color: #fff;
        font-weight: bold;
    }
    
    pre {
        @include code;
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
        margin: ${spacing.normal} 0 ${spacing.extralarge};
        text-align: center;
    
        &::before {
            content: '...';
            display: inline-block;
            letter-spacing: 1em;
            line-height: 1;
        }
    }
`;
