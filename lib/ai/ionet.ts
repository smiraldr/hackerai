import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export const IONET_MODEL_KEY = "model-ionet";

// Defaults to io.net's tier-1 starter model. Override with a model id from
// https://api.intelligence.io.solutions/api/v1/models (subject to io.net
// access tiers) to route a different IO Intelligence model without a code
// change.
export const IONET_MODEL_ID =
  process.env.IONET_MODEL_ID?.trim() || "openai/gpt-oss-20b";

// Server-only credential. Missing credentials never make a request eligible.
export const isIonetConfigured = () =>
  Boolean(process.env.IONET_API_KEY?.trim());

export const ionet = createOpenAICompatible({
  name: "ionet",
  baseURL:
    process.env.IONET_BASE_URL?.trim() ||
    "https://api.intelligence.io.solutions/api/v1",
  apiKey: process.env.IONET_API_KEY,
  includeUsage: true,
});
