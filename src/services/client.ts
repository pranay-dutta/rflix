import TmdbClient from "./tmdb-client";
import BackendClient from "./backend-client";

const { VITE_USE_TMDB_CLIENT } = import.meta.env;

const createClient = <T>(endpoint: string) => {
  return VITE_USE_TMDB_CLIENT
    ? new TmdbClient<T>(endpoint)
    : new BackendClient<T>(endpoint);
};

export default createClient;
