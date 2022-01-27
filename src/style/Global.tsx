import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@rimauswap-libs/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  *:hover{
    text-decoration:none !important;
    outline:none !important;
  }
  body {
    background: ${({ theme }) => theme.isDark ? `radial-gradient(103.12% 50% at 50% 50%, ${theme.colors.background} 0%, ${theme.colors.background} 100%)` : `linear-gradient(139.73deg, ${theme.colors.background} 0%, ${theme.colors.background} 100%)` };
    img {
      height: auto;
      max-width: 100%;
    }
    a, a:hover{
      text-decoration:none;
      outline:none;
    }
    button {
      white-space: nowrap;
    }
    .toggle-button-group{
      white-space: nowrap;
    }
  }

  .Linkhref:hover{
    text-decoration:underline !important;
  }

`

export default GlobalStyle
