export interface ColorPalette {
  name: string;
  primary: string;
  accent: string;
  bg: string;
  text: string;
  scheme: 'light' | 'dark';
}

export interface FontPair {
  name: string;
  heading: string;
  body: string;
}
