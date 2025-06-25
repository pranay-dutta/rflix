/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_TMDB_ACCESS_AUTH_TOKEN: string;
  VITE_TMDB_API_KEY: string;
  VITE_TOGETHER_API_KEY: string;
  VITE_BACKEND_CLIENT: string;
  VITE_DEV_BACKEND_CLIENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
