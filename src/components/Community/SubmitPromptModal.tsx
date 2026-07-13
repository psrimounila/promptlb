import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SubmitPromptModal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Marketing");
  const [model, setModel] = useState("GPT-5");
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    console.log({
      title,
      description,
      category,
      model,
      prompt,
    });

    alert("Prompt submitted successfully!");

    setTitle("");
    setDescription("");
    setCategory("Marketing");
    setModel("GPT-5");
    setPrompt("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Submit Prompt</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Submit a Prompt</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <input
            className="w-full rounded-md border p-3"
            placeholder="Prompt Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full rounded-md border p-3"
            rows={3}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full rounded-md border p-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Marketing</option>
            <option>Business</option>
            <option>Coding</option>
            <option>Design</option>
            <option>Content</option>
            <option>Education</option>
            <option>Image</option>
            <option>SEO</option>
            <option>Social</option>
            <option>Productivity</option>
          </select>

          <select
            className="w-full rounded-md border p-3"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option>GPT-5</option>
            <option>Claude</option>
            <option>Gemini</option>
            <option>Grok</option>
          </select>

          <textarea
            rows={8}
            className="w-full rounded-md border p-3"
            placeholder="Write your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <Button
            className="w-full"
            onClick={handleSubmit}
          >
            Submit Prompt
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}