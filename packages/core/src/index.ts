import { z } from 'zod';

/**
 * Core types and Zod schemas for the benchmark runner.
 */

/* File map: filename -> content */
export const FileMapSchema = z.record(z.string(), z.string());
export type FileMap = z.infer<typeof FileMapSchema>;

export const TaskSpecSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  language: z.string().optional(),
  files: FileMapSchema.default({}),
  run: z.array(z.string()).default([]),
  test: z.array(z.string()).default([]),
  timeoutSecs: z.number().optional(),
  scoring: z.object({
    correctness: z.number().min(0).max(1).default(0.7),
    performance: z.number().min(0).max(1).default(0.2),
    style: z.number().min(0).max(1).default(0.1),
  }).optional(),
});

export type TaskSpec = z.infer<typeof TaskSpecSchema>;

export const TaskResultSchema = z.object({
  success: z.boolean(),
  outputs: z.record(z.string(), z.any()).optional(),
  metrics: z.object({
    runtimeMs: z.number().optional(),
    tokens: z.number().optional(),
    costUsd: z.number().optional(),
  }).optional(),
  error: z.string().optional(),
});

export type TaskResult = z.infer<typeof TaskResultSchema>;

export const EvalResultSchema = z.object({
  testsPassed: z.number().default(0),
  testsTotal: z.number().default(0),
  lintWarnings: z.number().default(0),
  typeErrors: z.number().default(0),
  score: z.number().min(0).max(100).default(0),
});

export type EvalResult = z.infer<typeof EvalResultSchema>;

export interface ToolAdapter {
  name: string;
  /**
   * Execute the given TaskSpec. If dryRun is true, adapters should simulate execution
   * without calling external APIs (useful for CI / local dev).
   */
  executeTask(spec: TaskSpec, opts?: { dryRun?: boolean; apiKey?: string }): Promise<TaskResult>;
}

export const BenchmarkRunSchema = z.object({
  id: z.string(),
  toolName: z.string(),
  taskId: z.string(),
  startedAt: z.string().optional(),
  finishedAt: z.string().optional(),
  result: TaskResultSchema.optional(),
});

export type BenchmarkRun = z.infer<typeof BenchmarkRunSchema>;
