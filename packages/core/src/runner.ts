import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { TaskSpec, TaskResult, ToolAdapter } from './index';

/**
 * Simple runner skeleton:
 * - writes TaskSpec.files into a temp directory
 * - if adapter is provided, delegates execution to adapter.executeTask
 * - returns TaskResult
 */
export async function runTask(spec: TaskSpec, adapter?: ToolAdapter, opts?: { dryRun?: boolean }): Promise<TaskResult> {
  if (opts?.dryRun) {
    return {
      success: true,
      outputs: {},
      metrics: { runtimeMs: 0, tokens: 0, costUsd: 0 },
    };
  }

  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'bench-'));
  try {
    // write files
    for (const [rel, content] of Object.entries(spec.files || {})) {
      const full = path.join(tmp, rel);
      await fs.mkdir(path.dirname(full), { recursive: true });
      await fs.writeFile(full, content, 'utf8');
    }

    if (adapter) {
      // Provide projectDir via spec if adapter needs it (adapter API may vary)
      const result = await adapter.executeTask(spec, { dryRun: false });
      return result;
    }

    // No adapter: return a basic success with outputs list
    return {
      success: true,
      outputs: Object.keys(spec.files || {}),
      metrics: { runtimeMs: 0 },
    };
  } finally {
    // best-effort cleanup
    try {
      await fs.rm(tmp, { recursive: true, force: true });
    } catch (e) {
      // ignore
    }
  }
}
