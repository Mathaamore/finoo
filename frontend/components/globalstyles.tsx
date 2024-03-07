import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --color: 56,27,154;
    --primary-color: rgb(var(--color));
    --primary-color30: rgba(var(--primary-color), 0.3);
    --primary-color90: rgba(var(--primary-color), 0.9);

    --sidebar-width: 17%;
  }

  html,
  body {
    color: ${({ theme }) => theme.colors.primary};
    background-color: #fafafa;
    padding: 0;
    margin: 0;
    font-family: 'Inter', sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    height: 12px;
    width: 6px;
    background: #fafafa;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    -webkit-border-radius: 1ex;
    -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
  }

  ::-webkit-scrollbar-corner {
    background: #fafafa;
  }
`
