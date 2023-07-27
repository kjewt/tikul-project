/// <reference types="vite/client" />
interface ImportMetaEnv {}

declare module "import.meta" {
  interface ImportMeta {
    env: ImportMetaEnv;
  }
}
