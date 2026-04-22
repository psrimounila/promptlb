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
  Claude: "openai/gpt-5-mini", // gateway doesn't ship anthropic; use a strong default
  Gemini: "google/gemini-2.5-flash",
  "Gemini Pro": "google/gemini-2.5-pro",
  Midjourney: "google/gemini-2.5-flash", // describe instead of generate image
  "DALL·E": "google/gemini-2.5-flash",
  "Stable Diffusion": "google/gemini-2.5-flash",
};

export const runPrompt = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => RunPromptSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { output: "", error: "AI service is not configured." };
    }

    const targetModel = MODEL_MAP[data.model] ?? "openai/gpt-5-mini";

    const isImageModel = ["Midjourney", "DALL·E", "Stable Diffusion"].includes(
      data.model,
    );

    const systemPrompt = isImageModel
      ? `You are an expert image-prompt engineer simulating ${data.model}. Given the user's image prompt, describe in vivid, structured detail what the resulting image would look like: subject, composition, lighting, color palette, style, mood, and any technical settings (aspect ratio, lens, etc.). Return only the description, no commentary.`
      : `You are ${data.model}, a helpful AI assistant. Respond to the user's prompt thoughtfully and concisely. Use clean formatting (markdown headers, lists, code blocks) where appropriate. Do not preface your answer with disclaimers.`;

    try {
      const res = await fetch(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: targetModel,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: data.prompt },
            ],
          }),
        },
      );

      if (!res.ok) {
        if (res.status === 429) {
          return {
            output: "",
            error: "Rate limit reached. Please try again in a moment.",
          };
        }
        if (res.status === 402) {
          return {
            output: "",
            error: "AI credits exhausted. Please add credits to continue.",
          };
        }
        const text = await res.text();
        console.error("AI gateway error", res.status, text);
        return { output: "", error: "AI service is currently unavailable." };
      }

      const json = await res.json();
      const output: string =
        json.choices?.[0]?.message?.content?.trim() ?? "";
      return { output, error: null as string | null };
    } catch (err) {
      console.error("runPrompt failed", err);
      return { output: "", error: "Network error. Please try again." };
    }
  });
