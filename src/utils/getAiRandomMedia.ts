import Together from "together-ai";

const together = new Together({ apiKey: import.meta.env.VITE_TOGETHER_API_KEY });

type AiData = {
  id: number;
  type: "movie" | "tv";
};

const getAiRandomMedia = async (search_query: string): Promise<AiData | undefined> => {
  const res = await together.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: search_query },
    ],
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    max_tokens: 50,
    temperature: 2,
  });
  const content = res.choices[0].message?.content ?? "";
  return validateResponse(content);
};

export default getAiRandomMedia;
const systemPrompt = `
  Respond only with a valid TMDB ID for a movie or TV series.

  - You can return based on the user words like mood, movie name or genre

  - If the prompt includes an exact title, return its ID.
  - Use this format only:
    {"type": "movie", "id": tmdb_movie_id}
    {"type": "tv", "id": tmdb_tv_id}
  - No other text or explanation.

`;

const validateResponse = (content: string) => {
  let data: { type: "movie" | "tv"; id: number } | null = null;

  try {
    data = JSON.parse(content);
  } catch {
    const match = content.match(
      /"type"\s*:\s*"(?<type>movie|tv)".*?"id"\s*:\s*(?<id>\d+)/,
    );
    if (match?.groups) {
      data = {
        type: match.groups.type as "movie" | "tv",
        id: parseInt(match.groups.id, 10),
      };
    }
  }

  if (data) return data;
};
