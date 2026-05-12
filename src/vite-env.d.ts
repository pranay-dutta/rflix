/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_TMDB_API_KEY: string;
  VITE_DEV_BACKEND_CLIENT: string;
  VITE_PROD_BACKEND_CLIENT: string;
  VITE_CLERK_PUBLISHABLE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
