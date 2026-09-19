import { describe, it, expect, afterEach } from "@jest/globals";
import {
  IONET_MODEL_ID,
  IONET_MODEL_KEY,
  isIonetConfigured,
} from "@/lib/ai/ionet";
import { getModelDisplayName, myProvider } from "@/lib/ai/providers";

describe("IO Intelligence provider", () => {
  const originalKey = process.env.IONET_API_KEY;
  const originalModelId = process.env.IONET_MODEL_ID;

  afterEach(() => {
    if (originalKey === undefined) {
      delete process.env.IONET_API_KEY;
    } else {
      process.env.IONET_API_KEY = originalKey;
    }
    if (originalModelId === undefined) {
      delete process.env.IONET_MODEL_ID;
    } else {
      process.env.IONET_MODEL_ID = originalModelId;
    }
  });

  it("is not configured without an API key", () => {
    delete process.env.IONET_API_KEY;
    expect(isIonetConfigured()).toBe(false);
  });

  it("is configured with a non-empty API key", () => {
    process.env.IONET_API_KEY = "test-key";
    expect(isIonetConfigured()).toBe(true);
  });

  it("ignores a whitespace-only API key", () => {
    process.env.IONET_API_KEY = "   ";
    expect(isIonetConfigured()).toBe(false);
  });

  it("defaults the model id to the IO Intelligence starter model", () => {
    expect(IONET_MODEL_ID).toBe("openai/gpt-oss-20b");
  });

  it("registers the IO Intelligence model with the shared provider", () => {
    expect(() => myProvider.languageModel(IONET_MODEL_KEY)).not.toThrow();
    expect(getModelDisplayName(IONET_MODEL_KEY)).toBe("IO Intelligence");
  });
});
