import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";


const EnhanceSchema = z.object({
  prompt: z.string().min(3).max(2000),
  outputType: z.enum(["text", "image", "code"]).optional().default("text"),
});

const BASE_SYSTEM = `You are an expert prompt engineer. Take a user's rough idea and rewrite it as a structured, high-quality prompt that will produce excellent results from any large language model.

Always output the enhanced prompt in this exact structure:

**🎯 Goal**
<one clear sentence about what the user wants>

**👥 Audience**
<who the response is for and their context>

**🎨 Tone & Style**
<voice, register, formality, energy>

**📋 Format**
<structure, length, headings, bullets, code blocks, tables, etc.>

**📝 Prompt**
<the final, ready-to-paste prompt that includes role, context, task, constraints, and examples where helpful. Use second person and imperative voice. Be specific. Add 2-4 concrete constraints.>

Do not add any commentary before or after these sections. Use exactly these emoji headers.`;

const IMAGE_GUIDANCE = `

The user wants an IMAGE generation prompt (for tools like Midjourney, DALL-E, Nano Banana). In the **📝 Prompt** section:
- Start the prompt with "Generate an image of..."
- Include rich visual details: art style, composition, colors, lighting, mood, camera/lens, aspect ratio
- Avoid instructions meant for text models`;

const CODE_GUIDANCE = `

The user wants a CODE generation prompt. In the **📝 Prompt** section:
- Specify the language, framework, and runtime
- Define inputs, outputs, edge cases, and constraints
- Ask for clean, idiomatic, well-commented code with brief usage example`;

export const enhancePrompt = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => EnhanceSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return { enhanced: "", error: "AI service is not configured." };
    }

    const SYSTEM =
      BASE_SYSTEM +
      (data.outputType === "image"
        ? IMAGE_GUIDANCE
        : data.outputType === "code"
          ? CODE_GUIDANCE
          : "");

    try {
      const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
  contents: [
    {
      parts: [
        {
          text: `${SYSTEM}

Rough idea:

${data.prompt}

Enhance it.`,
        },
      ],
    },
  ],
}),
        },
      );

      if (!res.ok) {
        if (res.status === 429) {
          return {
            enhanced: "",
            error: "Rate limit reached. Please try again in a moment.",
          };
        }
        if (res.status === 402) {
          return {
            enhanced: "",
            error: "AI credits exhausted. Please add credits to continue.",
          };
        }
        const text = await res.text();
        console.error("enhance-prompt gateway error", res.status, text);
        return {
          enhanced: "",
          error: "AI service is currently unavailable.",
        };
      }

      const json = await res.json();

const enhanced =
  json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
      return { enhanced, error: null as string | null };
    } catch (err) {
      console.error("enhancePrompt failed", err);
      return { enhanced: "", error: "Network error. Please try again." };
    }
  });
