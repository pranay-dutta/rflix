import TmdbClient from "./tmdb-client";
import BackendClient from "./backend-client";

const { DEV } = import.meta.env;

const createClient = <T>(endpoint: string) => {
  return DEV ? new TmdbClient<T>(endpoint) : new BackendClient<T>(endpoint);
};

export default createClient;
