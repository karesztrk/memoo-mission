/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly API_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    __REDUX_STORE__: Store;
  }
}
