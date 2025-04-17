interface Genre {
  id: number;
  name: string;
}
interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  genres: Genre[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string; //url
  production_companies: ProductionCompany[];
  release_date: string;
  runtime: number;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
}
