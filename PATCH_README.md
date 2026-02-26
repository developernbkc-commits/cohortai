# Netlify Install Fix Patch v2 (Node 20 + npm registry reset)

Date: 2026-02-26

## Why builds were failing
Netlify was trying to install dependencies from an internal registry URL:
`packages.applied-caas-gateway1.internal.api.openai.org/...`
This host is not reachable from Netlify, so installs fail with ETIMEDOUT.

Also, Netlify kept selecting Node 22. This patch pins Node 20 LTS for stability.

## What this patch does
- Pins Node to 20 (via .nvmrc + NODE_VERSION)
- Forces npm registry to https://registry.npmjs.org/ (via .npmrc + NPM_CONFIG_REGISTRY)
- Uses npm ci for deterministic installs
- Disables husky in CI
- Adds retry settings for npm network resilience
- Adds netlify.toml at repo root so Netlify clearly detects config

## How to apply
1) Extract this zip at the repo root (same level as the `cohortai-labs/` folder)
2) Commit and push all added/updated files
3) In Netlify: trigger a deploy (ideally "Clear cache and deploy")

## If it still uses Node 22 after this
Check Netlify UI:
Site settings → Build & deploy → Environment → NODE_VERSION should be 20.
If a UI env var forces Node 22, remove/override it.
