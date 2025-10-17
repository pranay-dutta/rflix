import { Crew, Cast } from "@/interfaces/Credit";

export const isCrew = (person: Cast | Crew): person is Crew => {
  return (person as Crew).department !== undefined;
};
