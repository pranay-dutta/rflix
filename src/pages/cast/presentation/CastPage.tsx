import { getCreditImage, getTMDBImage } from "@/components/constants";
import { Quote } from "@/components/Quote";
import { Cast, Crew } from "@/interfaces/Credit";
import { isCrew } from "@/utils/isCrew";
import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Skeleton,
  Span,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { CastPageProps } from "../container/CastPageContainer";

const CastPage = ({
  activePalette,
  posterPath,
  isTvShow,
  tagline,
  overview,
  genres,
  casts,
  crew,
  title,
  sortedDepartments,
  crewByDepartment,
}: CastPageProps) => {
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <Box>
      <Flex
        direction={{ base: "column", md: "row" }}
        p={4}
        gap={5}
        borderRadius="sm"
        bgColor={activePalette + ".900/20"}
      >
        <Skeleton loading={imgLoading} minWidth="185px" minHeight="278px">
          <Image
            borderRadius="sm"
            width="185px"
            height="278px"
            onLoad={() => setImgLoading(false)}
            src={getTMDBImage(posterPath, "w185")}
          />
        </Skeleton>
        <Flex direction="column" gap={4}>
          <Heading fontSize="2xl" mb={2}>
            {title}
          </Heading>
          <Quote tagline={tagline} />
          <Text mt={4}>{overview}</Text>

          <HStack flexWrap="wrap">
            {genres.map((genre) => (
              <Badge size="md" key={genre.id}>
                {genre.name}
              </Badge>
            ))}
          </HStack>
        </Flex>
      </Flex>

      <Flex
        mt={4}
        gap={{ md: 180, xl: 520, lg: 320 }}
        flexDirection={{ base: "column", md: "row" }}
        alignItems="flex-start"
      >
        <Flex direction="column" gap={4}>
          <Heading my={4}>
            {isTvShow && "Series"} Cast <Span color="gray.400">{casts?.length}</Span>
          </Heading>
          {casts.map((person) => (
            <PersonInfo key={person.id} person={person} />
          ))}
        </Flex>

        <Flex direction="column" gap={4}>
          {crew.length > 0 && (
            <Heading my={4}>
              {isTvShow && "Series"} Crew <Span color="gray.400">{crew.length}</Span>
            </Heading>
          )}

          {sortedDepartments.map((department) => (
            <Box key={department} mb={6}>
              <Flex direction="column" gap={2}>
                <Heading size="sm" color="gray.300" mb={3} mt={4}>
                  {department}
                </Heading>
                <Flex direction="column" gap={2}>
                  {crewByDepartment[department].map((person, index) => (
                    <PersonInfo
                      key={`${person.id}-${person.job}-${index}`}
                      person={person}
                    />
                  ))}
                </Flex>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

const PersonInfo = ({ person }: { person: Cast | Crew }) => {
  return (
    <HStack gap={4}>
      <Image
        width="50px"
        height="70px"
        objectPosition="center"
        objectFit="cover"
        borderRadius="sm"
        src={getCreditImage(person.profile_path)}
      />
      <Box>
        <Text fontWeight="bold">{person.name}</Text>
        <Text color="gray.300" fontSize="sm">
          {isCrew(person) ? person.job : person.character}
        </Text>
      </Box>
    </HStack>
  );
};
export default CastPage;
