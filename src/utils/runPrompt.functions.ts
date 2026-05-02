import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const RunPromptSchema = z.object({
  prompt: z.string().min(1).max(8000),
  model: z.string().min(1).max(50).default("ChatGPT"),
});

// Map UI model names to Lovable AI gateway model ids
const MODEL_MAP: Record<string, string> = {
  ChatGPT: "openai/gpt-5-mini",
  "GPT-5": "openai/gpt-5",
  Claude: "openai/gpt-5-mini",
  Gemini: "google/gemini-2.5-flash",
  "Gemini Pro": "google/gemini-2.5-pro",
  // Image models route to Gemini's image generation model
  Midjourney: "google/gemini-2.5-flash-image",
  "DALL·E": "google/gemini-2.5-flash-image",
  "Stable Diffusion": "google/gemini-2.5-flash-image",
};

const IMAGE_MODELS = new Set(["Midjourney", "DALL·E", "Stable Diffusion"]);

export const runPrompt = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => RunPromptSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return {
        output: "",
        outputType: "text" as "text" | "image",
        error: "AI service is not configured.",
      };
    }

    const targetModel = MODEL_MAP[data.model] ?? "openai/gpt-5-mini";
    const isImageModel = IMAGE_MODELS.has(data.model);

    const systemPrompt = `You are ${data.model}, a helpful AI assistant. Respond to the user's prompt thoughtfully and concisely. Use clean formatting (markdown headers, lists, code blocks) where appropriate. Do not preface your answer with disclaimers.`;

    try {
      const body: Record<string, unknown> = {
        model: targetModel,
        messages: isImageModel
          ? [{ role: "user", content: data.prompt }]
          : [
              { role: "system", content: systemPrompt },
              { role: "user", content: data.prompt },
            ],
      };
      if (isImageModel) {
        body.modalities = ["image", "text"];
      }

      const res = await fetch(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      if (!res.ok) {
        if (res.status === 429) {
          return {
            output: "",
            outputType: "text" as const,
            error: "Rate limit reached. Please try again in a moment.",
          };
        }
        if (res.status === 402) {
          return {
            output: "",
            outputType: "text" as const,
            error: "AI credits exhausted. Please add credits to continue.",
          };
        }
        const text = await res.text();
        console.error("AI gateway error", res.status, text);
        return {
          output: "",
          outputType: "text" as const,
          error: "AI service is currently unavailable.",
        };
      }

      const json = await res.json();

      if (isImageModel) {
        // Gemini image responses include images on the assistant message
        const message = json.choices?.[0]?.message;
        const imageUrl: string | undefined =
          message?.images?.[0]?.image_url?.url ??
          message?.images?.[0]?.url;
        if (imageUrl) {
          return {
            output: imageUrl,
            outputType: "image" as const,
            error: null as string | null,
          };
        }
        // Fallback if no image returned
        const fallback: string = message?.content?.trim() ?? "";
        return {
          output: fallback,
          outputType: "text" as const,
          error: fallback ? null : "No image was generated. Please try again.",
        };
      }

      const output: string =
        json.choices?.[0]?.message?.content?.trim() ?? "";
      return {
        output,
        outputType: "text" as const,
        error: null as string | null,
      };
    } catch (err) {
      console.error("runPrompt failed", err);
      return {
        output: "",
        outputType: "text" as const,
        error: "Network error. Please try again.",
      };
    }
  });
