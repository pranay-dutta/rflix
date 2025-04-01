/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_TMDB_ACCESS_AUTH_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
