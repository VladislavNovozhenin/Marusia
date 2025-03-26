/// <reference types="react-scripts" />

declare module '*.module.css' {
  const styles: { [key: string]: string };
  export = styles;
}

declare module 'eslint-plugin-import' {
  const plugin: any;
  export default plugin;
}
