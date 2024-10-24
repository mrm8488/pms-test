import { z } from 'zod';

export const PromptSchema = z.object({
  id: z.string(),
  content: z.string(),
  version: z.number(),
  timestamp: z.number(),
  message: z.string(),
});

export type Prompt = z.infer<typeof PromptSchema>;

export class PromptStore {
  private prompts: Map<string, Prompt[]> = new Map();

  commit(id: string, content: string, message: string): Prompt {
    const versions = this.prompts.get(id) || [];
    const newVersion: Prompt = {
      id,
      content,
      version: versions.length + 1,
      timestamp: Date.now(),
      message,
    };
    
    this.prompts.set(id, [...versions, newVersion]);
    return newVersion;
  }

  getHistory(id: string): Prompt[] {
    return this.prompts.get(id) || [];
  }

  getVersion(id: string, version: number): Prompt | undefined {
    const versions = this.prompts.get(id) || [];
    return versions.find(v => v.version === version);
  }

  getLatest(id: string): Prompt | undefined {
    const versions = this.prompts.get(id) || [];
    return versions[versions.length - 1];
  }

  getAllPrompts(): string[] {
    return Array.from(this.prompts.keys());
  }
}

export const store = new PromptStore();