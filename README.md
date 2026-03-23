# Agentic Coding Tools Benchmark

> **Framework for comparing agentic programming tools** — measuring cost, quality, speed, and reliability across real-world development tasks.

## 🎯 Goal

Find the **optimal workflow** for AI-agentic software development by benchmarking:
- **GitHub Copilot CLI**
- **OpenAI Codex CLI**
- **Claude Code**
- **Google Gemini CLI**
- *(extensible to future tools)*

## 📊 What We Measure

| Dimension | Metrics |
|-----------|---------|
| **Cost** | Total tokens, USD cost, cost/line, cost/language |
| **Quality** | Test pass rate, lint score, type safety, code review score (0-100) |
| **Speed** | Wall clock time, time to first output, tokens/sec |
| **Reliability** | Success rate, retry count, consistency across runs |
| **Combos** | Best tool per phase (planning, coding, testing, review) |

## 🏗️ Architecture

```
benchmarks/
├── packages/
│   ├── core/               # Runner, Evaluator, CostTracker, Types
│   ├── adapters/           # Tool-specific adapters
│   │   ├── claude-code/
│   │   ├── copilot-cli/
│   │   ├── codex-cli/
│   │   └── gemini-cli/
│   ├── dashboard/          # Next.js visualization dashboard
│   └── projects/           # Real-world project templates
│       ├── task-manager/   # TypeScript + Next.js + Prisma
│       ├── marketplace-api/ # Python + FastAPI
│       └── ai-agent/       # Python + LangGraph
├── tasks/                  # YAML task definitions per project
└── results/                # Benchmark run results (JSON)
```

## 🚀 Project Phases

| Phase | Description | Issues |
|-------|-------------|--------|
| 0 | Monorepo setup (Turborepo + pnpm) | #1, #2, #3 |
| 1 | Core framework (Runner, Evaluator, CostTracker) | #4-#9 |
| 2 | Task Manager project template + tasks | #10-#12 |
| 3 | Claude Code adapter + first benchmark run | #13-#14 |
| 4 | Next.js dashboard (leaderboard, cost analysis, combos) | #15-#19 |
| 5 | Additional tool adapters (Copilot, Codex, Gemini) | #20-#23 |
| 6 | Additional project templates (Marketplace, AI Agent) | #24-#26 |
| 7 | Combo analysis + workflow optimization | #27-#28 |
| 8 | Portable skills extension for multi-tool support | #29-#31 |

## 📋 Status

See [Issues](https://github.com/Sintetiko-labs/benchmarks/issues) for detailed task tracking.

## License

MIT
