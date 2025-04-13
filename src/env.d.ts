/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly API_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
