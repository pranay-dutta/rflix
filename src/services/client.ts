import TmdbClient from "./tmdb-client";
import BackendClient from "./backend-client";

export const isActiveTmdbClient = true;
const createClient = <T>(endpoint: string) => {
  return isActiveTmdbClient
    ? new TmdbClient<T>(endpoint)
    : new BackendClient<T>(endpoint);
};

export default createClient;