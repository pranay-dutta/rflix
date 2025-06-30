/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_TMDB_API_KEY: string;
  VITE_TOGETHER_API_KEY: string;
  VITE_BACKEND_CLIENT: string;
  VITE_DEV_BACKEND_CLIENT: string;
  VITE_CLERK_PUBLISHABLE_KEY: string;
  VITE_USE_TMDB_CLIENT: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
