/// <reference types="astro/client" />

import type { Store } from "./store/store";

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

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string;
  }
}
