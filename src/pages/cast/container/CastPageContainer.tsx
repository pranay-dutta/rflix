import useCredits from "@/hooks/useCredits";
import useMovie from "@/hooks/useMovie";
import useTvSeries from "@/hooks/useTvSeries";
import useCustomizationStore from "@/store/customizationStore";
import isMovieDetails from "@/utils/isMovieDetails";
import { useLocation, useParams } from "react-router-dom";
import CastPage from "../presentation/CastPage";
import { Genre } from "@/interfaces/Genre";
import { Cast, Crew } from "@/interfaces/Credit";

interface LocationState {
  isTvShow: boolean;
}

export interface CastPageProps {
  activePalette: string;
  posterPath: string;
  tagline: string;
  overview: string;
  genres: Genre[];
  casts: Cast[];
  crew: Crew[];
  title: string;
  isTvShow: boolean;
  sortedDepartments: string[];
  crewByDepartment: Record<string, Crew[]>;
}
const CastPageContainer = () => {
  const { id } = useParams();
  if (!id) throw new Error("Cast page requires ID");

  const location = useLocation();
  const state = location.state as LocationState;
  const { isTvShow } = state;

  const movieId = isTvShow ? 0 : parseInt(id);
  const tvId = isTvShow ? parseInt(id) : 0;

  const { movie, isLoading: movieLoading } = useMovie(movieId);
  const { data: tvData, isLoading: tvLoading } = useTvSeries(tvId, "details");

  const activePalette = useCustomizationStore((s) => s.activePalette);

  const { data: credits } = useCredits(id, isTvShow);

  const isLoading = isTvShow ? tvLoading : movieLoading;
  const media = isTvShow ? tvData : movie;

  if (isLoading) return <div>Loading...</div>;
  if (!credits || !media) return <div>No data found</div>;

  const { cast, crew } = credits;

  const crewByDepartment = crew.reduce((acc, person) => {
    const department = person.department;
    if (!acc[department]) {
      acc[department] = [];
    }
    acc[department].push(person);
    return acc;
  }, {} as Record<string, typeof crew>);

  const sortedDepartments = Object.keys(crewByDepartment).sort();
  const { poster_path, tagline, overview, genres } = media;
  const title = isMovieDetails(media) ? media.title : media.name;

  const castPageProps: CastPageProps = {
    activePalette,
    posterPath: poster_path,
    isTvShow,
    tagline,
    overview,
    genres,
    casts: cast,
    crew,
    title,
    sortedDepartments,
    crewByDepartment,
  };

  return <CastPage {...castPageProps} />;
};

export default CastPageContainer;
