import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mainColor: string;
    highlightColor: string;
    borderRadius: string;
  }
}