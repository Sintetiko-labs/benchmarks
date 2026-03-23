import { parse as parseYaml } from 'yaml';
import { TaskSpecSchema, TaskSpec } from './index';

/**
 * Parse a TaskSpec from a YAML string and validate with Zod.
 * Throws an Error if validation fails.
 */
export function parseTaskSpecFromYaml(yamlStr: string): TaskSpec {
  const parsed = parseYaml(yamlStr) as unknown;
  const res = TaskSpecSchema.safeParse(parsed);
  if (!res.success) {
    // Normalize zod error
    throw new Error(`Invalid TaskSpec: ${JSON.stringify(res.error.format(), null, 2)}`);
  }
  return res.data;
}

export async function parseTaskSpecFile(path: string): Promise<TaskSpec> {
  const fs = await import('fs/promises');
  const raw = await fs.readFile(path, 'utf-8');
  return parseTaskSpecFromYaml(raw);
}
