# Claude Code Adapter

Adapter skeleton for Claude Code. Supports dryRun mode so the framework can be exercised without provider credentials or cost.

To implement real integration, add a CLI/SDK invocation in executeTask and extract token/cost metrics from the provider response.
