import { TaskSpec, TaskResult, ToolAdapter } from '../../../core/src/index';
import { performance } from 'perf_hooks';

/**
 * Claude Code adapter skeleton.
 * - Supports dryRun mode for safe local testing (no external API calls)
 * - Real API/CLI integration left as a TODO (requires user credentials)
 */
export class ClaudeCodeAdapter implements ToolAdapter {
  name = 'claude-code';

  async executeTask(spec: TaskSpec, opts?: { dryRun?: boolean; apiKey?: string }): Promise<TaskResult> {
    const start = performance.now();
    if (opts?.dryRun) {
      const size = JSON.stringify(spec.files || {}).length + (spec.description?.length || 0);
      const tokens = Math.max(8, Math.floor(size / 4));
      const duration = 20 + Math.floor(tokens / 2);
      const outputs: Record<string, any> = {};
      for (const k of Object.keys(spec.files || {})) outputs[k] = '<generated (dryRun)>';
      return {
        success: true,
        outputs,
        metrics: { runtimeMs: duration, tokens, costUsd: 0 },
      };
    }

    // Real execution: require CLAUDE_API_KEY or similar. Not implemented to avoid accidental costs.
    if (!opts?.apiKey && !process.env.CLAUDE_API_KEY) {
      return {
        success: false,
        outputs: {},
        metrics: { runtimeMs: 0, tokens: 0, costUsd: 0 },
        error: 'CLAUDE_API_KEY not set; real execution disabled. Use dryRun=true for safe testing.'
      };
    }

    // TODO: integrate with Claude CLI / SDK when credentials are available.
    return {
      success: false,
      outputs: {},
      metrics: { runtimeMs: 0, tokens: 0, costUsd: 0 },
      error: 'Real Claude integration not implemented.'
    };
  }
}

export default new ClaudeCodeAdapter();
