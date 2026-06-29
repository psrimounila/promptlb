import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const RunPromptSchema = z.object({
  prompt: z.string().min(1).max(8000),
  model: z.string().min(1).max(50).default("ChatGPT"),
  outputType: z.enum(["text", "image", "code"]).optional(),
});

// Map UI model names to Lovable AI gateway model ids
const MODEL_MAP: Record<string, string> = {
  ChatGPT: "openai/gpt-5-mini",
  "GPT-5": "openai/gpt-5",
  Claude: "openai/gpt-5-mini",
  Gemini: "google/gemini-2.5-flash",
  "Gemini Pro": "google/gemini-2.5-pro",
  // Image models route to Gemini's image generation model
  Midjourney: "google/gemini-2.5-flash-image-preview",
  "DALL·E": "google/gemini-2.5-flash-image-preview",
  "Stable Diffusion": "google/gemini-2.5-flash-image-preview",
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

    // Detect image-generation intent from prompt text so that even if a
    // text model (e.g. ChatGPT) is selected, an obvious image prompt still
    // produces an image instead of a text description.
    const lower = data.prompt.toLowerCase();
    const imageIntent =
      /\b(image|picture|photo|photograph|poster|illustration|wallpaper|render|artwork|logo|icon|sticker|banner|thumbnail|scene|portrait|landscape)\b/.test(
        lower,
      ) ||
      /\b(generate|create|draw|design|make|produce)\b[^.\n]{0,40}\b(image|picture|photo|poster|illustration|art|scene|render|logo|icon|banner|post|graphic|visual)\b/.test(
        lower,
      ) ||
      /\b(midjourney|sdxl|stable diffusion|dall[- ]?e|--ar |--style )\b/.test(lower) ||
      /\b(social (media )?post|instagram post|product hero|hero shot)\b/.test(lower);

    const isImageModel = IMAGE_MODELS.has(data.model) || imageIntent;
    const targetModel = isImageModel
      ? "google/gemini-2.5-flash-image-preview"
      : MODEL_MAP[data.model] ?? "openai/gpt-5-mini";

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
        // Gemini image responses can include images in several shapes.
        const message = json.choices?.[0]?.message;

        // 1) message.images[0].image_url.url | message.images[0].url
        let imageUrl: string | undefined =
          message?.images?.[0]?.image_url?.url ??
          message?.images?.[0]?.url;

        // 2) message.content as array of parts with image_url or b64_json
        if (!imageUrl && Array.isArray(message?.content)) {
          for (const part of message.content) {
            const url =
              part?.image_url?.url ??
              part?.image_url ??
              (part?.type === "image_url" ? part?.url : undefined);
            if (typeof url === "string" && url.length > 0) {
              imageUrl = url;
              break;
            }
            const b64 = part?.b64_json ?? part?.image?.b64_json;
            if (typeof b64 === "string" && b64.length > 0) {
              imageUrl = `data:image/png;base64,${b64}`;
              break;
            }
          }
        }

        // 3) top-level data array (some providers)
        if (!imageUrl && Array.isArray(json?.data)) {
          const d = json.data[0];
          const url = d?.url;
          const b64 = d?.b64_json;
          if (typeof url === "string") imageUrl = url;
          else if (typeof b64 === "string") imageUrl = `data:image/png;base64,${b64}`;
        }

        if (imageUrl) {
          return {
            output: imageUrl,
            outputType: "image" as const,
            error: null as string | null,
          };
        }

        console.error("No image in gateway response", JSON.stringify(json).slice(0, 500));
        return {
          output: "",
          outputType: "image" as const,
          error: "No image was generated. Please try a more descriptive prompt.",
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
