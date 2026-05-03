import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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

export const enhancePrompt = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => EnhanceSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { enhanced: "", error: "AI service is not configured." };
    }

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
            model: "google/gemini-2.5-flash",
            messages: [
              { role: "system", content: SYSTEM },
              {
                role: "user",
                content: `Rough idea: "${data.prompt}"\n\nEnhance it.`,
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
      const enhanced: string =
        json.choices?.[0]?.message?.content?.trim() ?? "";
      return { enhanced, error: null as string | null };
    } catch (err) {
      console.error("enhancePrompt failed", err);
      return { enhanced: "", error: "Network error. Please try again." };
    }
  });
